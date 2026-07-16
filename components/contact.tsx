"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const whatsappNumber = "50237741107";

    const whatsappMessage = [
      "¡Hola! 👋",
      "",
      "Me gustaría solicitar información.",
      "",
      `👤 Nombre: ${name}`,
      `📧 Correo: ${email}`,
      `📌 Asunto: ${subject || "Consulta general"}`,
      "",
      "💬 Mensaje:",
      message,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSent(true);
    form.reset();
  }

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">
            Contacto
          </p>

          <h2 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            ¿Buscas algo en particular? Conversemos.
          </h2>

          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            Escríbenos para cotizaciones, ventas por mayor o asesoría sobre el
            accesorio ideal para tu setup. Respondemos dentro del día hábil.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <a
              href="mailto:info@unyxgt.com"
              className="flex items-center gap-4"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Mail className="size-5" />
              </div>

              <span className="text-foreground transition-opacity hover:opacity-70">
                info@unyxgt.com
              </span>
            </a>

            <a
              href="https://wa.me/50237226071"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Phone className="size-5" />
              </div>

              <span className="text-foreground transition-opacity hover:opacity-70">
                +502 3774 1107
              </span>
            </a>

            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <MapPin className="size-5" />
              </div>

              <span className="text-foreground">
                Zona 10, Ciudad de Guatemala
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="size-7" />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-foreground">
                ¡Mensaje preparado!
              </h3>

              <p className="max-w-xs text-muted-foreground">
                WhatsApp se abrió con tu consulta. Solo debes presionar el botón
                de enviar.
              </p>

              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nombre
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Asunto
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                  placeholder="¿En qué te ayudamos?"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Mensaje
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                  placeholder="Cuéntanos qué necesitas"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Enviar por WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
