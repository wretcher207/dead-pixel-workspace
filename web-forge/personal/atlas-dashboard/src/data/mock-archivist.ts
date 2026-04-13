import type { ArchivistPayload } from '../types/atlas'

export const mockArchivist: ArchivistPayload = {
  status: 'attention',
  findings: [
    { id: 'ar1', category: 'misplaced_file', description: 'PSD files in Downloads folder — should be in Assets/Design-Files', sourcePath: 'C:\\Users\\david\\Downloads', suggestedPath: 'C:\\Users\\david\\Assets\\Design-Files', fileCount: 5, fileTypes: ['.psd', '.ai'], sizeBytes: 340000000, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'move', status: 'pending' },
    { id: 'ar2', category: 'orphaned_cluster', description: 'AI-generated images scattered across 4 directories', sourcePath: 'Multiple locations', suggestedPath: 'C:\\Users\\david\\Assets\\AI-Art', fileCount: 142, fileTypes: ['.png', '.jpg', '.webp'], sizeBytes: 2100000000, severity: 'medium', approvalLevel: 'approval_recommended', suggestedAction: 'consolidate', status: 'pending' },
    { id: 'ar3', category: 'desktop_clutter', description: '14 files on Desktop — oldest is 23 days old', sourcePath: 'C:\\Users\\david\\Desktop', suggestedPath: null, fileCount: 14, fileTypes: ['.txt', '.png', '.pdf', '.lnk'], sizeBytes: 45000000, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'review', status: 'pending' },
    { id: 'ar4', category: 'naming_inconsistency', description: 'Web project folders use mixed naming conventions (camelCase vs kebab-case)', sourcePath: 'C:\\Users\\david\\Documents\\dead-pixel-design\\web-forge', suggestedPath: null, fileCount: 8, fileTypes: ['directory'], sizeBytes: 0, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'rename', status: 'pending' },
    { id: 'ar5', category: 'misplaced_file', description: 'Audio exports found in Documents instead of Audio/Exports', sourcePath: 'C:\\Users\\david\\Documents', suggestedPath: 'C:\\Users\\david\\Audio\\Exports', fileCount: 7, fileTypes: ['.wav', '.mp3'], sizeBytes: 890000000, severity: 'low', approvalLevel: 'approval_recommended', suggestedAction: 'move', status: 'pending' },
  ],
  metrics: {
    organizationalScore: 58,
    organizationalScoreTrend: 'flat',
    misplacedFileCount: 87,
    desktopFileCount: 14,
    desktopOldestFileDays: 23,
    migrationQueueCount: 5,
    structureCompliancePercent: 42,
  },
}
