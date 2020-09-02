import {Scene} from "./FrameEngine/engine.js";
import {UIButton, UILabel} from "./FrameEngine/ui.js";
import {TransitionSwipe} from "./FrameEngine/transition.js";
import {SCENE_TAG_TITLE, FONT_FIXED_WIDTH} from './Constants.js';

export class ScoreScene extends Scene {
    constructor(engine, tagName=null) {
        super(engine, tagName);
        const [centerX, centerY] = [engine.getCanvas().width/2, engine.getCanvas().height/2];
        const gotoTitleButton = new UIButton(engine, centerX, centerY+150, null);
        gotoTitleButton.setImage('go_title.png');
        this.addUIObject(gotoTitleButton);
        const scoreTitle = new UILabel(engine, centerX, 60, 'YOUR SCORES');
        scoreTitle.setFont(FONT_FIXED_WIDTH, 45);
        this.addUIObject(scoreTitle);
        const clientData = engine.getClientData();
        clientData.scores.map((v, i) => {
            const prefixes = ['st', 'nd'];
            const score = `00000${v}`.slice(-5);
            const scoreLine = new UILabel(engine, centerX, 140 + 50 * i, `${i+1}${prefixes[i] || 'th'} ... ${score}`); // TODO: apply latest scores
            scoreLine.setFont(FONT_FIXED_WIDTH, 40);
            scoreLine.setTag(`scoreLabel${i}`);
            this.addUIObject(scoreLine);
        });
        gotoTitleButton.setEventListener((engine, scene, e) => engine.changeSceneByTag(SCENE_TAG_TITLE, new TransitionSwipe()));
    }
}