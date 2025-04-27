import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type MyPlugin from "./main";

/**
 * Settings tab for the plugin
 */
export class PluginSettingsTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Plugin Settings' });
        
        // General settings section
        this.addGeneralSettings(containerEl);
        
        // Feature toggles section
        this.addFeatureToggles(containerEl);
        
        // Confirmation Modal Settings section
        if (this.plugin.settings.enabledFeatures.confirmModal) {
            this.addConfirmModalSettings(containerEl);
        }
    }
    
    /**
     * Add general settings section
     */
    private addGeneralSettings(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'General Settings' });
        
        new Setting(containerEl)
            .setName('Sample Setting')
            .setDesc('This is a sample setting')
            .addText(text => text
                .setPlaceholder('Enter a value')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));
    }
    
    /**
     * Add feature toggles section
     */
    private addFeatureToggles(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'Features' });
        
        new Setting(containerEl)
            .setName('Enable Confirmation Modal')
            .setDesc('Enable the confirmation modal feature')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enabledFeatures.confirmModal)
                .onChange(async (value) => {
                    this.plugin.settings.enabledFeatures.confirmModal = value;
                    await this.plugin.saveSettings();
                    
                    // Reload the settings tab to show/hide the confirmation modal settings
                    this.display();
                    
                    // Inform user that a reload is needed for full effect
                    new Notice('Settings saved. Reload the plugin for changes to take full effect.');
                }));
    }
    
    /**
     * Add settings for the confirmation modal
     */
    private addConfirmModalSettings(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'Confirmation Modal Settings' });
        
        const settings = this.plugin.settings.confirmModal;
        
        new Setting(containerEl)
            .setName('Modal Title')
            .setDesc('The title displayed in the confirmation modal')
            .addText(text => text
                .setPlaceholder('Enter modal title')
                .setValue(settings.title)
                .onChange(async (value) => {
                    settings.title = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Primary Message')
            .setDesc('The main message displayed in the confirmation modal')
            .addText(text => text
                .setPlaceholder('Enter primary message')
                .setValue(settings.messages[0])
                .onChange(async (value) => {
                    settings.messages[0] = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Secondary Message')
            .setDesc('The secondary message displayed in the confirmation modal')
            .addText(text => text
                .setPlaceholder('Enter secondary message')
                .setValue(settings.messages[1])
                .onChange(async (value) => {
                    settings.messages[1] = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Confirm Button Text')
            .setDesc('The text displayed on the confirm button')
            .addText(text => text
                .setPlaceholder('Enter confirm button text')
                .setValue(settings.confirmButtonText)
                .onChange(async (value) => {
                    settings.confirmButtonText = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Cancel Button Text')
            .setDesc('The text displayed on the cancel button')
            .addText(text => text
                .setPlaceholder('Enter cancel button text')
                .setValue(settings.cancelButtonText)
                .onChange(async (value) => {
                    settings.cancelButtonText = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Confirm Notice')
            .setDesc('The notification displayed when confirmed')
            .addText(text => text
                .setPlaceholder('Enter confirm notice')
                .setValue(settings.confirmNotice)
                .onChange(async (value) => {
                    settings.confirmNotice = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Cancel Notice')
            .setDesc('The notification displayed when cancelled')
            .addText(text => text
                .setPlaceholder('Enter cancel notice')
                .setValue(settings.cancelNotice)
                .onChange(async (value) => {
                    settings.cancelNotice = value;
                    await this.plugin.saveSettings();
                }));
    }
}
