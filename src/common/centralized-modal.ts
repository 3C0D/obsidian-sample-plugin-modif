// This file demonstrates importing from centralized configuration
// It's a copy of the modal from obsidian-plugin-config for testing

import { App, Modal } from "obsidian";

export interface CentralizedModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export class CentralizedModal extends Modal {
  private options: CentralizedModalOptions;

  constructor(app: App, options: CentralizedModalOptions) {
    super(app);
    this.options = options;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();

    // Title
    contentEl.createEl("h2", { text: this.options.title });

    // Message
    contentEl.createEl("p", { text: this.options.message });

    // Buttons container
    const buttonContainer = contentEl.createDiv("modal-button-container");

    // Cancel button
    const cancelBtn = buttonContainer.createEl("button", {
      text: this.options.cancelText || "Cancel",
      cls: "mod-cta"
    });
    cancelBtn.addEventListener("click", () => {
      this.options.onCancel?.();
      this.close();
    });

    // Confirm button
    const confirmBtn = buttonContainer.createEl("button", {
      text: this.options.confirmText || "Confirm",
      cls: "mod-cta mod-warning"
    });
    confirmBtn.addEventListener("click", () => {
      this.options.onConfirm();
      this.close();
    });

    // Focus on confirm button
    confirmBtn.focus();
  }

  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}

// Utility function for quick usage
export function showCentralizedModal(app: App, options: CentralizedModalOptions): void {
  new CentralizedModal(app, options).open();
}
