import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { SOCIAL_LINKS } from '@/database/data';
import {
  X,
  Send,
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Download,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

export const ContactModal: React.FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const playInteract = useAudioStore((s) => s.playInteract);
  const playSuccess = useAudioStore((s) => s.playSuccess);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '< 5k€',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (activeModal !== 'contact') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    playInteract();

    // Simulate sending transmission
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      playSuccess();
    }, 900);
  };

  const handleClose = () => {
    playInteract();
    closeModal();
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] border-2 border-[#D95D39]/30 rounded-2xl shadow-2xl p-6 md:p-8 text-[#2B201A]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D95D39]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#D95D39] flex items-center justify-center text-white shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#2B201A] tracking-wide">
                L'ESPACE D'ÉCHANGE &amp; DIALOGUE
              </h2>
              <p className="text-xs font-mono text-[#7A583A] font-semibold">
                INITIER UNE COLLABORATION AVEC JUNES AGASSOUNON
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2.5 text-[#7A583A] hover:text-[#2B201A] hover:bg-[#F3EDE2] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Channels Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {SOCIAL_LINKS.filter((l) => l.platform !== 'cv').map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#D95D39]/20 rounded-xl text-xs font-mono text-[#2B201A] transition-colors shadow-sm font-semibold"
            >
              {link.platform === 'email' && <Mail className="w-3.5 h-3.5 text-[#D95D39]" />}
              {link.platform === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-[#D95D39]" />}
              {link.platform === 'github' && <Github className="w-3.5 h-3.5 text-[#D95D39]" />}
              {link.platform === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5 text-[#2A9D8F]" />}
              <span>{link.label.split(' ')[0]}</span>
            </a>
          ))}
        </div>

        {/* Main Transmission Form */}
        {submitted ? (
          <div className="p-8 text-center bg-[#FAF7F2] border border-[#2A9D8F]/40 rounded-2xl space-y-3 shadow-sm">
            <CheckCircle className="w-12 h-12 text-[#2A9D8F] mx-auto" />
            <h3 className="text-lg font-bold text-[#2B201A]">Message Reçu avec Succès !</h3>
            <p className="text-xs text-[#4A2E1B] max-w-sm mx-auto font-medium">
              Merci {formData.name}. Votre message a bien été transmis. Junes AGASSOUNON vous répondra avec plaisir sous 24 heures.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-mono font-bold bg-[#D95D39] text-white rounded-xl shadow-md hover:bg-[#E76F51]"
              >
                RETOUR AU MONDE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#7A583A] mb-1 font-semibold">
                  VOTRE NOM
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Alex Dupont"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D95D39]/25 rounded-xl text-sm text-[#2B201A] focus:outline-none focus:border-[#D95D39]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#7A583A] mb-1 font-semibold">
                  EMAIL DE CONTACT
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ex: contact@societe.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D95D39]/25 rounded-xl text-sm text-[#2B201A] focus:outline-none focus:border-[#D95D39]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#7A583A] mb-1 font-semibold">
                  SUJET / TYPE DE PROJET
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="ex: Projet Web, Graphisme ou Identité Visuelle"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D95D39]/25 rounded-xl text-sm text-[#2B201A] focus:outline-none focus:border-[#D95D39]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#7A583A] mb-1 font-semibold">
                  FOURCHETTE BUDGÉTAIRE
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D95D39]/25 rounded-xl text-sm text-[#2B201A] focus:outline-none focus:border-[#D95D39]"
                >
                  <option value="< 5k€">&lt; 5 000 €</option>
                  <option value="5k€ - 15k€">5 000 € - 15 000 €</option>
                  <option value="15k€ - 30k€">15 000 € - 30 000 €</option>
                  <option value="> 30k€">&gt; 30 000 €</option>
                  <option value="Recrutement">Recrutement / CDI / Lead</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#7A583A] mb-1 font-semibold">
                MESSAGE / OBJECTIFS DU PROJET
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez votre vision, votre calendrier et vos besoins créatifs ou techniques..."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D95D39]/25 rounded-xl text-sm text-[#2B201A] focus:outline-none focus:border-[#D95D39] resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="/assets/cv-junes-agassounon.pdf"
                download
                className="flex items-center gap-2 text-xs font-mono font-bold text-[#D95D39] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                Télécharger le CV (PDF)
              </a>

              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-50 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                {isSending ? 'ENVOI EN COURS...' : 'ENVOYER LE MESSAGE'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
