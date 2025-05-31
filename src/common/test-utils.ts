// COMMENTED FOR AUTONOMOUS VERSION
// import { NoticeHelper, SettingsHelper } from "obsidian-plugin-config/utils";
import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

/**
 * Test file to demonstrate the new centralized utils
 * DISABLED FOR AUTONOMOUS VERSION
 */
export class TestUtilsCommand {

    static testNotices(): void {
        console.log("Autonomous version - centralized utils disabled");
        /*
        // Test different types of notices
        NoticeHelper.success("Operation completed successfully!");

        setTimeout(() => {
            NoticeHelper.warning("This is a warning message");
        }, 1000);

        setTimeout(() => {
            NoticeHelper.error("Something went wrong");
        }, 2000);

        setTimeout(() => {
            NoticeHelper.info("Here's some information");
        }, 3000);

        // Test loading notice
        setTimeout(() => {
            const loadingNotice = NoticeHelper.loading("Processing...");

            setTimeout(() => {
                NoticeHelper.updateToSuccess(loadingNotice, "Processing completed!");
            }, 2000);
        }, 4000);

        // Test progress notice
        setTimeout(() => {
            let current = 0;
            const total = 10;
            let progressNotice = NoticeHelper.progress("Downloading files", current, total);

            const interval = setInterval(() => {
                current++;
                progressNotice.hide();
                progressNotice = NoticeHelper.progress("Downloading files", current, total);

                if (current >= total) {
                    clearInterval(interval);
                    progressNotice.hide();
                    NoticeHelper.success("Download completed!");
                }
            }, 500);
        }, 6000);
        */
    }

    static testCustomNotice(): void {
        console.log("Autonomous version - centralized utils disabled");
        // NoticeHelper.custom("🚀", "Custom notice with rocket emoji!");
    }
}

/**
 * Example settings tab using the centralized SettingsHelper
 * DISABLED FOR AUTONOMOUS VERSION
 */
export class TestSettingsTab extends PluginSettingTab {
    plugin: Plugin;

    constructor(app: App, plugin: Plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        console.log("Autonomous version - centralized SettingsHelper disabled");
        /*
        // Create header
        SettingsHelper.createHeader(
            containerEl,
            "Test Settings",
            "These settings demonstrate the centralized SettingsHelper"
        );
        
        // Test toggle setting
        SettingsHelper.createToggleSetting(
            containerEl,
            "Enable feature",
            "Toggle this feature on or off",
            true,
            (value: boolean) => {
                NoticeHelper.info(`Feature ${value ? 'enabled' : 'disabled'}`);
            }
        );
        
        // Test text setting
        SettingsHelper.createTextSetting(
            containerEl,
            "API Key",
            "Enter your API key here",
            "",
            (value: string) => {
                console.log("API Key changed:", value);
            },
            "sk-..."
        );
        
        // Test dropdown setting
        SettingsHelper.createDropdownSetting(
            containerEl,
            "Theme",
            "Select your preferred theme",
            {
                "light": "Light Theme",
                "dark": "Dark Theme",
                "auto": "Auto (System)"
            },
            "auto",
            (value: string) => {
                NoticeHelper.info(`Theme changed to: ${value}`);
            }
        );
        
        // Test number setting
        SettingsHelper.createNumberSetting(
            containerEl,
            "Max items",
            "Maximum number of items to display",
            10,
            (value: number) => {
                console.log("Max items changed:", value);
            },
            1,
            100,
            1
        );
        
        // Test button setting
        SettingsHelper.createButtonSetting(
            containerEl,
            "Test notices",
            "Click to test all notice types",
            "Test Notices",
            () => {
                TestUtilsCommand.testNotices();
            }
        );
        
        // Test collapsible section
        const { container: advancedContainer } = SettingsHelper.createCollapsibleSection(
            containerEl,
            "Advanced Settings",
            false
        );
        
        SettingsHelper.createTextSetting(
            advancedContainer,
            "Debug mode",
            "Enable debug logging",
            "",
            (value: string) => {
                console.log("Debug mode:", value);
            }
        );
        */
    }
}
