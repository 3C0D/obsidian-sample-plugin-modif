// Simple test to verify that centralized utils can be imported
import { NoticeHelper, SettingsHelper } from "obsidian-plugin-config/utils";

export function testImport(): void {
    console.log("✅ Successfully imported centralized utils!");
    console.log("NoticeHelper:", typeof NoticeHelper);
    console.log("SettingsHelper:", typeof SettingsHelper);
    
    // Test a simple notice
    NoticeHelper.success("Centralized utils are working! 🎉");
}
