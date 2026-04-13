use crate::config::cursor_dir;
use std::{fs, path::Path};

/// Returns (new_lines, next_byte_offset)
pub fn read_new_lines(path: &Path, offset: u64) -> std::io::Result<(Vec<String>, u64)> {
    let file = fs::File::open(path)?;
    let metadata = file.metadata()?;
    let file_len = metadata.len();

    if file_len <= offset {
        return Ok((vec![], offset));
    }

    use std::io::{BufRead, BufReader, Seek, SeekFrom};
    let mut file = file;
    file.seek(SeekFrom::Start(offset))?;
    let mut reader = BufReader::new(file);
    let mut lines = Vec::new();
    let mut new_offset = offset;

    loop {
        let mut line = String::new();
        let n = reader.read_line(&mut line)?;
        if n == 0 {
            break;
        }
        new_offset += n as u64;
        let trimmed = line.trim_end_matches('\n').trim_end_matches('\r');
        if !trimmed.is_empty() {
            lines.push(trimmed.to_string());
        }
    }

    Ok((lines, new_offset))
}

fn cursor_path(file_path: &str) -> std::path::PathBuf {
    let safe = file_path.replace(['/', '\\', ':'], "_");
    cursor_dir().join(format!("{safe}.cursor"))
}

pub fn read_cursor(file_path: &str) -> u64 {
    let path = cursor_path(file_path);
    fs::read_to_string(path)
        .ok()
        .and_then(|s| s.trim().parse().ok())
        .unwrap_or(0)
}

pub fn write_cursor(file_path: &str, offset: u64) -> std::io::Result<()> {
    let path = cursor_path(file_path);
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(path, offset.to_string())
}

pub fn session_id_from_path(path: &str) -> String {
    Path::new(path)
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("unknown")
        .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serial_test::serial;
    use std::{env, io::Write};
    use tempfile::tempdir;

    #[test]
    #[serial]
    fn reads_new_lines_past_offset() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());
        let file_path = dir.path().join("test.jsonl");
        let mut f = std::fs::File::create(&file_path).unwrap();
        writeln!(f, "line1").unwrap();
        writeln!(f, "line2").unwrap();
        drop(f);

        let (lines, next_offset) = read_new_lines(&file_path, 0).unwrap();
        assert_eq!(lines.len(), 2);
        assert!(next_offset > 0);

        let (lines2, _) = read_new_lines(&file_path, next_offset).unwrap();
        assert!(lines2.is_empty());
    }

    #[test]
    #[serial]
    fn cursor_roundtrip() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());
        write_cursor("myfile.jsonl", 42).unwrap();
        let offset = read_cursor("myfile.jsonl");
        assert_eq!(offset, 42);
    }

    #[test]
    fn session_id_extracted_from_path() {
        let id = session_id_from_path("/home/.claude/projects/myproject/abc-123.jsonl");
        assert_eq!(id, "abc-123");
    }
}
