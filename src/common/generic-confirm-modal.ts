import { App, Modal, Setting } from "obsidian";

/**
 * Type definition for the confirmation callback
 */
export type ConfirmCallback = (confirmed: boolean) => void;

/**
 * A generic confirmation modal that can be used by different features
 */
export class GenericConfirmModal extends Modal {
    constructor(
        app: App,
        public title: string,
        public messages: string[],
        public confirmButtonText: string = "Confirm",
        public cancelButtonText: string = "Cancel",
        public onSubmit: ConfirmCallback
    ) {
        super(app);
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        // Set modal size for better readability
        this.modalEl.style.width = `500px`;
        
        // Add title
        contentEl.createEl("h2", { text: this.title });
        
        // Add messages
        for (const message of this.messages) {
            contentEl.createEl("p", { text: message });
        }

        // Add buttons
        new Setting(contentEl)
            .addButton((btn) => {
                btn.setButtonText(this.confirmButtonText)
                    .setCta()
                    .onClick(() => {
                        this.onSubmit(true);
                        this.close();
                    });
            })
            .addButton((btn) =>
                btn.setButtonText(this.cancelButtonText)
                    .onClick(() => {
                        this.onSubmit(false);
                        this.close();
                    }));
    }

    onClose() {
        this.contentEl.empty();
    }
}
