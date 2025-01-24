import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInviteEmail({
  email,
  inviteLink,
  organizationName,
  role
}: {
  email: string
  inviteLink: string
  organizationName: string
  role: string
}) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `You've been invited to join ${organizationName}`,
      html: `
        <div>
          <h1>You've been invited to ${organizationName}</h1>
          <p>You've been invited to join ${organizationName} as a ${role.toLowerCase()}.</p>
          <p>Click the link below to accept your invitation:</p>
          <a href="${inviteLink}" style="display: inline-block; background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
            Accept Invitation
          </a>
          <p>This invite will expire in 7 days.</p>
          <p>If you did not expect this invitation, you can safely ignore this email.</p>
        </div>
      `
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending invite email:", error)
    return { success: false }
  }
}
