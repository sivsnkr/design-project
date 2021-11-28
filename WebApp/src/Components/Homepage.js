import React, { useState } from 'react';
import * as tf from "@tensorflow/tfjs"
import facts from "../data/facts.json"


const modelUrl = "https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/tfjs/model.json"
const model = async (temp, ph, setAns) => {
    return await tf.loadLayersModel(modelUrl).then(m => {
        if (parseFloat(temp) && parseFloat(ph)) {
            if (temp === 0 || ph === 0) {
                alert("Please enter valid values")
                return
            }
            else {
                var dat = [parseFloat(temp), parseFloat(ph)]
                var shap = [1, 2]
                var results = m.predict(tf.tensor2d(dat, shap));
                //  console.log(results.dataSync())
                Promise.resolve(results.dataSync()).then(s => {
                    setAns(s)
                })
            }
        }
        else{
            alert("Enter numeric value")
            return
        }

    })
}

function Homepage() {
    const [count, setCount] = useState(0);
    const [temp, setTemp] = useState(0);
    const [PH, setPH] = useState(0);
    const [ans, setAns] = useState(0);
    return (
        <div className = "ocean">
            <div style={{ textAlign: 'center', fontSize: 25, position : "fixed", top : "30px", left : "35%" , color : "black"}}>See how much oxygen disolved in the water</div>
            <div style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: "space-between" , alignItems : "center", width : "60%", margin: "30px auto",  position : "fixed", top : "90px", left : "15%" }}>
                <div style={{ 
                    // marginTop: 20 
                }}
                    className="card-form">
                    <form className="signup">
                        <div className="form-title">Predictions of D.O(mg/L)</div>
                        <div className="form-body">
                            <div className="row">
                                <input onChange={(e) => setTemp(e.target.value)} type="text" placeholder="Water Temp (20-30)" />
                            </div>
                            <div className="row">
                                <input onChange={(e) => setPH(e.target.value)} type="text" placeholder="Water pH" />
                            </div>
                        </div>
                        <div className="rule"></div>
                        <div className="form-footer" style={{ display: "flex", flexDirection: 'row' }}>
                            <a href="/#" onClick={async () => { console.log(await model(temp, PH, setAns)) }}>Calculate<span className="fa fa-ban"></span></a>
                            <div style={{ color: 'black' }}>{parseFloat(ans).toFixed(4)}</div>
                        </div>
                    </form>
                </div>
                {(facts.length <= 100) ? (<div className="card">
                    <div id="circle"></div>
                    <h2>Facts</h2>
                    <p>{facts[count].Fact}</p>
                    <div className="content">
                        <a style = {{color : "white"}}onClick={(e) => setCount(count + ((Math.floor(Math.random() * 100))) - count)}>New Fact</a>
                    </div>
                </div>) : (<div>No Fact</div>)}
            </div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
    );
}

export default Homepage;
