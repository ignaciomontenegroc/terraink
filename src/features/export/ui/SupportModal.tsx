import { createPortal } from "react-dom";
import {
  KOFI_URL,
  SOCIAL_INSTAGRAM,
  AD_SLOT_MODAL,
  ADS_MODAL_ENABLED,
} from "@/core/config";
import { CloseIcon, InstagramIcon } from "@/shared/ui/Icons";
import AdUnit from "@/shared/ui/AdUnit";
import type { SupportPromptVariant } from "@/features/export/application/useExport";

interface SupportModalProps {
  posterNumber: number;
  variant: SupportPromptVariant;
  onClose: () => void;
  titleId?: string;
}

export default function SupportModal({
  posterNumber,
  variant,
  onClose,
  titleId = "export-support-modal-title",
}: SupportModalProps) {
  const kofiUrl = String(KOFI_URL ?? "").trim();
  const instagramUrl = String(SOCIAL_INSTAGRAM ?? "").trim();

  return createPortal(
    <div
      className="picker-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="picker-modal support-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="support-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <div className="support-modal__body">
          {variant === "donate" ? (
            <>
              <p className="support-modal__headline" id={titleId}>
                ❤︎ Enjoying Terraink?
              </p>
              <p className="support-modal__text">
                You've just made your poster <strong>#{posterNumber}</strong>. Terraink
                is free and ad-light — a small donation keeps it that way and funds new
                features.
              </p>
              <div className="support-modal__actions">
                {kofiUrl ? (
                  <a
                    className="support-modal__kofi"
                    href={kofiUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="heart">❤︎</span> Donate
                  </a>
                ) : (
                  <button
                    type="button"
                    className="support-modal__dismiss"
                    onClick={onClose}
                  >
                    Close
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="support-modal__headline" id={titleId}>
                ✨ Your poster is ready!
              </p>
              <p className="support-modal__text">
                Follow Terraink on Instagram for fresh map ideas, design tips, and the
                latest features — and show off the posters you make.
              </p>
              <div className="support-modal__actions">
                {instagramUrl ? (
                  <a
                    className="support-modal__instagram"
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon /> Follow us
                  </a>
                ) : (
                  <button
                    type="button"
                    className="support-modal__dismiss"
                    onClick={onClose}
                  >
                    Close
                  </button>
                )}
              </div>
            </>
          )}
          <AdUnit
            slot={AD_SLOT_MODAL}
            enabled={ADS_MODAL_ENABLED}
            className="support-modal__ad"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
