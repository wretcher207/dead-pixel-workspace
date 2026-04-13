import { useState } from 'react'
import { mockSettings } from '../data/mock-settings'
import { useAtlasData } from '../hooks/useAtlasData'
import { fetchSettings } from '../api/atlas-api'

type Tab = 'schedule' | 'cleanup' | 'performance' | 'security' | 'organization' | 'updates' | 'notifications' | 'protected'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'schedule', label: 'Schedule', icon: 'schedule' },
  { id: 'cleanup', label: 'Cleanup', icon: 'cleaning_services' },
  { id: 'performance', label: 'Performance', icon: 'speed' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'organization', label: 'Organization', icon: 'folder' },
  { id: 'updates', label: 'Updates', icon: 'system_update' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'protected', label: 'Protected Folders', icon: 'lock' },
]

function Toggle({ checked, label }: { checked: boolean; label: string }) {
  return (
    <label className="flex items-center justify-between py-3 group cursor-pointer">
      <span className="text-sm">{label}</span>
      <div className={`w-10 h-5 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
    </label>
  )
}

function NumberInput({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <label className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          defaultValue={value}
          className="w-20 bg-surface-container-lowest border-0 border-b-2 border-transparent focus:border-primary text-sm text-on-surface px-2 py-1 rounded-sm font-label outline-none text-right"
        />
        <span className="text-xs text-on-surface-variant/50 font-label w-12">{unit}</span>
      </div>
    </label>
  )
}

function SelectInput({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <select
        defaultValue={value}
        className="bg-surface-container-lowest border-0 border-b-2 border-transparent focus:border-primary text-sm text-on-surface px-2 py-1 rounded-sm font-label outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('schedule')
  const { data: s } = useAtlasData(fetchSettings, mockSettings)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-on-surface-variant/10 flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">SETTINGS</h2>
          <p className="text-xs font-label text-on-surface-variant/50 uppercase">Configuration & Preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Tab Sidebar */}
        <div className="col-span-3 bg-surface-container-low/50 p-2 rounded-xl border border-white/[0.03] space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/[0.08] text-primary border-l-2 border-primary'
                  : 'text-on-surface-variant/50 hover:bg-surface-container-low hover:text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span className="font-label text-[11px] uppercase tracking-wider font-bold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-9 bg-surface-container-low p-8 rounded-xl border border-white/[0.04]">
          {activeTab === 'schedule' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Schedule Settings</h3>
              <Toggle checked={s.schedule.dailyScanEnabled} label="Daily scan enabled" />
              <SelectInput label="Daily scan time" value={s.schedule.dailyScanTime} options={['30 min after boot', '1 hour after boot', '9:00 AM', '12:00 PM']} />
              <Toggle checked={s.schedule.weeklyScanEnabled} label="Weekly scan enabled" />
              <SelectInput label="Weekly scan day" value={s.schedule.weeklyScanDay} options={['Sunday', 'Monday', 'Saturday']} />
              <Toggle checked={s.schedule.monthlyScanEnabled} label="Monthly scan enabled" />
              <SelectInput label="Monthly scan day" value={s.schedule.monthlyScanDay} options={['First Saturday', 'First Sunday', '1st of month']} />
            </div>
          )}

          {activeTab === 'cleanup' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Cleanup Settings</h3>
              <NumberInput label="Temp file age threshold" value={s.cleanup.tempFileAgeDays} unit="days" />
              <NumberInput label="Recycle bin age threshold" value={s.cleanup.recycleBinAgeDays} unit="days" />
              <NumberInput label="Large file threshold" value={s.cleanup.largeFileThresholdMB} unit="MB" />
              <NumberInput label="Stale file threshold" value={s.cleanup.staleFileThresholdDays} unit="days" />
              <Toggle checked={s.cleanup.autoClearTemp} label="Auto-clear temp files" />
              <Toggle checked={s.cleanup.autoClearRecycleBin} label="Auto-clear recycle bin" />
              <Toggle checked={s.cleanup.autoClearBrowserCache} label="Auto-clear browser cache" />
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Performance Settings</h3>
              <NumberInput label="Chrome RAM alert threshold" value={s.performance.chromeRamAlertGB} unit="GB" />
              <NumberInput label="Chrome tab alert threshold" value={s.performance.chromeTabAlertCount} unit="tabs" />
              <NumberInput label="Boot time alert threshold" value={s.performance.bootTimeAlertSeconds} unit="sec" />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Security Settings</h3>
              <Toggle checked={s.security.autoUpdateDefenderDefs} label="Auto-update Defender definitions" />
              <SelectInput label="Extension audit frequency" value={s.security.extensionAuditFrequency} options={['Daily', 'Weekly', 'Monthly']} />
              <SelectInput label="Port scan frequency" value={s.security.portScanFrequency} options={['Weekly', 'Monthly', 'Quarterly']} />
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Organization Settings</h3>
              <NumberInput label="Desktop age alert threshold" value={s.organization.desktopAgeAlertDays} unit="days" />
              <NumberInput label="Project staleness threshold" value={s.organization.projectStaleDays} unit="days" />
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Update Policies</h3>
              <SelectInput label="Audio tool updates" value={s.updates.audioToolPolicy} options={['Explicit Approval Required', 'Approval Recommended', 'Monitor Only']} />
              <SelectInput label="Dev tool updates" value={s.updates.devToolPolicy} options={['Explicit Approval Required', 'Approval Recommended', 'Monitor Only']} />
              <SelectInput label="Browser updates" value={s.updates.browserUpdatePolicy} options={['Explicit Approval Required', 'Approval Recommended', 'Monitor Only']} />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-1 divide-y divide-outline-variant/15">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 pb-4">Notification Settings</h3>
              <Toggle checked={s.notifications.showCriticalImmediately} label="Show critical alerts immediately" />
              <Toggle checked={s.notifications.summaryAfterScan} label="Summary notification after scan" />
              <SelectInput label="Approval queue reminders" value={s.notifications.approvalQueueReminders} options={['Hourly', 'Daily', 'Weekly', 'Never']} />
            </div>
          )}

          {activeTab === 'protected' && (
            <div>
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-4">Protected Folders</h3>
              <p className="text-xs text-on-surface-variant/50 mb-6">These folders will never be modified by any agent without explicit approval.</p>
              <div className="space-y-2">
                {s.protectedFolders.map((folder, i) => (
                  <div key={i} className="flex items-center justify-between bg-surface-container/50 p-3 rounded-lg group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
                      <span className="font-mono text-xs">{folder}</span>
                    </div>
                    <button className="text-[10px] font-label uppercase tracking-wider text-error opacity-0 group-hover:opacity-100 transition-opacity">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 text-xs font-label font-bold uppercase tracking-wider text-primary hover:underline">
                <span className="material-symbols-outlined text-sm">add</span>
                Add Protected Folder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
