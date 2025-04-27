import {
  Plugin,
  Notice
} from "obsidian";
import { GenericConfirmModal } from "./common/generic-confirm-modal.js";
import { DEFAULT_SETTINGS } from "./settings.js";
import type { PluginSettings } from "./settings.js";
import { PluginSettingsTab } from "./settingsTab.js";

export default class MyPlugin extends Plugin {
  settings: PluginSettings;

  async onload(): Promise<void> {
    console.log("loading plugin");
    await this.loadSettings();

    // Initialize features based on settings
    this.initializeFeatures();

    // Add settings tab
    this.addSettingTab(new PluginSettingsTab(this.app, this));
  }

  /**
   * Initialize plugin features based on settings
   */
  private initializeFeatures(): void {
    // Add confirmation modal command if enabled
    if (this.settings.enabledFeatures.confirmModal) {
      this.addCommand({
        id: 'show-confirmation-modal',
        name: 'Show Confirmation Modal',
        callback: () => this.showConfirmationModal()
      });
    }
  }

  /**
   * Displays a confirmation modal using the configured settings
   */
  private showConfirmationModal(): void {
    const config = this.settings.confirmModal;

    const modal = new GenericConfirmModal(
      this.app,
      config.title,
      config.messages,
      config.confirmButtonText,
      config.cancelButtonText,
      (confirmed: boolean) => {
        if (confirmed) {
          new Notice(config.confirmNotice);
          console.log("Action confirmed by user");
        } else {
          new Notice(config.cancelNotice);
          console.log("Action cancelled by user");
        }
      }
    );

    modal.open();
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}


