export interface WhatsAppAnnouncement {
  id: string
  title: string
  content: string
  date: string
  published: boolean
}

export function generateWhatsAppMessage(announcement: WhatsAppAnnouncement): string {
  const message = `
🎌 *Anime Hub Novi Sad* 🎌

📢 *${announcement.title}*

${announcement.content}

📅 ${announcement.date}

---
🔗 Join our community: https://animehub.rs
💬 WhatsApp Group: https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56
  `.trim()

  return encodeURIComponent(message)
}

export function getWhatsAppShareLink(announcement: WhatsAppAnnouncement): string {
  const message = generateWhatsAppMessage(announcement)
  return `https://wa.me/?text=${message}`
}

export function getWhatsAppGroupLink(): string {
  return 'https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56'
}
