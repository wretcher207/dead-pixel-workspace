import {
  ClipboardCheck,
  FileText,
  Layers,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  TreePine,
} from 'lucide-react'

export const iconMap = {
  ClipboardCheck,
  FileText,
  Layers,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  TreePine,
}

export function getIcon(name) {
  return iconMap[name] ?? FileText
}
