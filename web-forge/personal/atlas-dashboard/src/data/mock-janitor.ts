import type { JanitorPayload } from '../types/atlas'

export const mockJanitor: JanitorPayload = {
  status: 'attention',
  findings: [
    { id: 'j1', category: 'temp_files', description: 'Windows Temp files older than 7 days', location: 'C:\\Windows\\Temp', fileCount: 234, sizeBytes: 1200000000, severity: 'low', reclaimableBytes: 1200000000, autoResolvable: true, approvalLevel: 'no_approval', suggestedAction: 'delete', status: 'auto_resolved' },
    { id: 'j2', category: 'temp_files', description: 'User Temp files older than 7 days', location: 'C:\\Users\\david\\AppData\\Local\\Temp', fileCount: 189, sizeBytes: 890000000, severity: 'low', reclaimableBytes: 890000000, autoResolvable: true, approvalLevel: 'no_approval', suggestedAction: 'delete', status: 'auto_resolved' },
    { id: 'j3', category: 'duplicates', description: 'Duplicate installer files detected', location: 'C:\\Users\\david\\Downloads', fileCount: 12, sizeBytes: 3400000000, severity: 'medium', reclaimableBytes: 3400000000, autoResolvable: false, approvalLevel: 'approval_recommended', suggestedAction: 'review', status: 'pending' },
    { id: 'j4', category: 'large_files', description: 'Large video files in Downloads', location: 'C:\\Users\\david\\Downloads', fileCount: 3, sizeBytes: 4200000000, severity: 'medium', reclaimableBytes: 4200000000, autoResolvable: false, approvalLevel: 'approval_recommended', suggestedAction: 'review', status: 'pending' },
    { id: 'j5', category: 'orphaned_node_modules', description: 'Stale node_modules (no git activity 90+ days)', location: 'C:\\Users\\david\\Documents\\old-project', fileCount: 18420, sizeBytes: 1800000000, severity: 'low', reclaimableBytes: 1800000000, autoResolvable: false, approvalLevel: 'approval_recommended', suggestedAction: 'delete', status: 'pending' },
    { id: 'j6', category: 'browser_cache', description: 'Chrome browser cache', location: 'Chrome Cache', fileCount: 4200, sizeBytes: 680000000, severity: 'low', reclaimableBytes: 680000000, autoResolvable: true, approvalLevel: 'no_approval', suggestedAction: 'delete', status: 'auto_resolved' },
    { id: 'j7', category: 'recycle_bin', description: 'Recycle bin items older than 30 days', location: 'Recycle Bin', fileCount: 47, sizeBytes: 320000000, severity: 'low', reclaimableBytes: 320000000, autoResolvable: true, approvalLevel: 'no_approval', suggestedAction: 'delete', status: 'auto_resolved' },
    { id: 'j8', category: 'zip_archives', description: 'Extracted ZIP files still in Downloads', location: 'C:\\Users\\david\\Downloads', fileCount: 8, sizeBytes: 950000000, severity: 'low', reclaimableBytes: 950000000, autoResolvable: false, approvalLevel: 'approval_recommended', suggestedAction: 'delete', status: 'pending' },
  ],
  metrics: {
    totalReclaimableBytes: 13440000000,
    totalReclaimableGB: 12.4,
    duplicateGroupCount: 6,
    duplicateFileCount: 12,
    downloadsFileCount: 48,
    downloadsSizeBytes: 8200000000,
    desktopFileCount: 14,
    tempSizeBytes: 2090000000,
    recycleBinSizeBytes: 320000000,
    recycleBinItemCount: 47,
    largeFileCount: 3,
    staleFileCount: 22,
    orphanedNodeModulesCount: 1,
    browserCacheSizeBytes: 680000000,
  },
}
