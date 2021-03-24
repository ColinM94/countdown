import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { LogBox } from 'react-native';

import { Button } from "components/Button"
import { ThemeProvider } from "contexts/ThemeContext"
import ContentView from "components/ContentView"

import { AddEvent } from "./routes/AddEvent";
import { ToastProvider } from "contexts/ToastContext";

export const Main = () => {
    LogBox.ignoreLogs(['Setting a timer']);



    return (
        <ThemeProvider>
            <ToastProvider>
                <ContentView>
                    <AddEvent />
                </ContentView>
                <StatusBar style="light" translucent={false} />
            </ToastProvider>
        </ThemeProvider>
    )
}
