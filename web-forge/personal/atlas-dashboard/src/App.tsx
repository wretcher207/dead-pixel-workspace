import { Routes, Route } from 'react-router-dom'
import { Sidebar, TopBar, PageShell } from './components'
import Overview from './pages/Overview'
import Supervisor from './pages/Supervisor'
import Janitor from './pages/Janitor'
import Mechanic from './pages/Mechanic'
import Gatekeeper from './pages/Gatekeeper'
import Archivist from './pages/Archivist'
import Scout from './pages/Scout'
import History from './pages/History'
import ApprovalQueue from './pages/ApprovalQueue'
import Settings from './pages/Settings'

export default function App() {
  return (
    <>
      <Sidebar />
      <TopBar />
      <PageShell>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/janitor" element={<Janitor />} />
          <Route path="/mechanic" element={<Mechanic />} />
          <Route path="/gatekeeper" element={<Gatekeeper />} />
          <Route path="/archivist" element={<Archivist />} />
          <Route path="/scout" element={<Scout />} />
          <Route path="/history" element={<History />} />
          <Route path="/approval-queue" element={<ApprovalQueue />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </PageShell>
    </>
  )
}
