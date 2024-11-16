import React from "react";

const SettingScreen: React.FC = () => {
    /**
     * For TS code:
     *
     * const [backgroundColor, setBackgroundColor] = useState<string | null>(localStorage.getItem('settings-background-color'));
     * const [fontColor, setFontColor] = useState<string | null>(localStorage.getItem('settings-background-color'));
     *
     * const colors = ["#FB8C00", "#43A047", "#1E88E5", "#E53935",
     *                 "#8E24AA", "#FFB300", "#333333", "#F5F5F5"]
     *
     * const onBackgroundColorClick = (color: string) => {
     *      localStorage.setItem('settings-background-color', color);
     *      setBackgroundColor(color)
     * }
     *
     * const onFontColorClick = (color: string) => {
     *      localStorage.setItem('settings-font-color', color);
     *      setFontColor(color)
     * }
     */

    /**
     * Put this in return HTML however you like
     * <DemoVoiceBar/>
     * <ColorSelectBar width={350} colors={colors} callback={onBackgroundColorClick}/>
     * <ColorSelectBar width={350} colors={colors} callback={onFontColorClick}/>
     */
    return (
        <div>
            <h1>Setting Screen</h1>
            <p>This is some content.</p>
        </div>
    );
};

export default SettingScreen;