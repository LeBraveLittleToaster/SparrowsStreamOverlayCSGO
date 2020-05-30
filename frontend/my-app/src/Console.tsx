import React from "react";
import { observer } from "mobx-react";
import Teams from './Teams';

function Console() {

    return (
        <div>
            <Teams/>
        </div>
    );
}

export default observer(Console);