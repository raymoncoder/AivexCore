"use client";

import { SystemMonitorTemplate } from "@/components/templates/SystemMonitorTemplate";
import { Navbar } from "@/components/layout/Navbar";

export default function SystemMonitorPage() {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="pt-20 max-w-[1400px] mx-auto">
                <SystemMonitorTemplate />
            </div>
        </div>
    );
}
