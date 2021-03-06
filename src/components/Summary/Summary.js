import React, { useContext } from 'react';

import { Context } from '../../services/Context';
import toUSD from '../../services/Utils';
import './Summary.scss'

import refresh from '../../assets/img/svg/refresh.svg';
import finalRed from '../../assets/img/png/final-red.png';
import finalBlue from '../../assets/img/png/final-blue.png';
import finalGray from '../../assets/img/png/final-gray.png';

export default function Summary() {
    const [CONTEXT, setCONTEXT] = useContext(Context);

    function rebuild() {
        //retorna para a fase incial
        setCONTEXT(currentContext => ({
            ...currentContext, current_stage: 1,
            isLoading: true,
        }))
    }

    var finalCarPrice = toUSD(CONTEXT.modelr.price + CONTEXT.modelr.engine_price + CONTEXT.modelr.color_price + CONTEXT.modelr.wheels_price)

    const finalCarImage = () => {
        if (CONTEXT.modelr.color_id === 4) {
            return finalRed;
        } else if (CONTEXT.modelr.color_id === 5) {
            return finalBlue;
        } else if (CONTEXT.modelr.color_id === 6) {
            return finalGray;
        } else return console.log('Error loading selected wheels.');

    }
    return (
        <div className="Stage">
            <div className="Stage__half --stagePreview">
                <h1 className="summaryTitle title__sm --summary">Your <span className="summaryTitle_model">Model </span><span className="summaryTitle_r">R</span></h1>
                <img src={finalCarImage()} className="--imagePreview --summary" alt="" />
            </div>
            <div className="Stage__half --stageSet">
                <div className="Summary">
                    <h1 className="summaryTitle title__lg">Your <span className="summaryTitle_model">Model </span><span className="summaryTitle_r">R</span></h1>
                    <span className="listItem">
                        <p>Starting price</p><p className="itemPrice">${toUSD(CONTEXT.modelr.price)}</p>
                    </span>
                    <hr className="lightHr" />
                    <span className="listItem">
                        <p>
                            {CONTEXT.modelr.engine_type}
                            {` - `}
                            {CONTEXT.modelr.engine_kwh}
                            {` - `}
                            {CONTEXT.modelr.engine_range} miles range
                        </p>
                        <p className="itemPrice">{CONTEXT.modelr.engine_price > 0 ? `+ $${toUSD(CONTEXT.modelr.engine_price)}` : 'Included'}</p>
                    </span>
                    <span className="listItem">
                        <p>{CONTEXT.modelr.color_label} Paint</p><p className="itemPrice">{CONTEXT.modelr.color_price > 0 ? `+ $${toUSD(CONTEXT.modelr.color_price)}` : 'Included'}</p>
                    </span>
                    <span className="listItem">
                        <p>{CONTEXT.modelr.wheels_label}</p><p className="itemPrice">{CONTEXT.modelr.wheels_price > 0 ? `+ $${toUSD(CONTEXT.modelr.wheels_price)}` : 'Included'}</p>
                    </span>
                    <hr className="lightHr" />
                    <span className="listItem --lg">
                        <p>Final price</p><p className="itemPrice">${finalCarPrice}</p>
                    </span>
                    <span className="listItem statusBar_rebuild" onClick={rebuild}>
                        <div className="underline">Rebuild<img src={refresh} alt="Rebuild car button." /></div>
                    </span>
                </div>
            </div>
        </div>
    );
}
