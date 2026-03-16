// convex/message.ts
import { action, mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const saveMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});

export const sendMessage = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const htmlEmailTemplate = `
      <div style="font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #2a2a2a; border-radius: 8px; background-color: #171717; color: #ffffff;">
        <h2 style="color: #12E6C8; margin-top: 0; border-bottom: 2px solid #2a2a2a; padding-bottom: 15px;">
          Pesan Baru dari Portfolio 🚀
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; width: 100px; color: #A287F4; font-weight: bold;">Nama</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #e5e5e5;">${args.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #A287F4; font-weight: bold;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #e5e5e5;">
              <a href="mailto:${args.email}" style="color: #12E6C8; text-decoration: none;">${args.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #A287F4; font-weight: bold;">Subjek</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #e5e5e5;">${args.subject}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <h3 style="color: #A287F4; font-size: 15px; margin-bottom: 10px;">Pesan:</h3>
          <div style="background-color: #232323; padding: 15px; border-radius: 6px; color: #d1d5db; line-height: 1.6; white-space: pre-wrap; border: 1px solid #2a2a2a;">
            ${args.message}
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #2a2a2a; text-align: center;">
          <p style="color: #a3a3a3; font-size: 12px; margin: 0;">
            Email ini dikirim secara otomatis melalui form kontak website portofolio kamu.
          </p>
        </div>
      </div>
    `;

    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL!,
        subject: `[Portfolio] ${args.subject}`,
        replyTo: args.email,
        text: `Name: ${args.name}\nEmail: ${args.email}\nSubject: ${args.subject}\n\nMessage:\n${args.message}`,
        html: htmlEmailTemplate,
      });

      await ctx.runMutation(api.message.saveMessage, args);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to send email" };
    }
  },
});