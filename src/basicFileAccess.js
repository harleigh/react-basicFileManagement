//every begining has a begining, and this is this begining. And, being that
//this is the begining, take it with a grain of salt as there is quite a road
//yet being paved; as I am learning, all code and documentation are "as is"

import { useState } from "react";


/**
 * 
 */
function FileAccess() {
    const [csvFileObj, setCvsFileObj] = useState("");
    const [fileContents, setFileContents] = useState("")    //will be removed

    /**
     * Pre: the csvFile has been set by the onChange event of the
     *      <input> component
     */
    const onProcessCsvFile = () =>{
        if(csvFileObj===""){return;}
        const fileReader = new FileReader();
        //setting the onload functionality of the file reader
        fileReader.onload = (e)=> {
            const text = e.target.result;
            setFileContents(text)
            //process data here...
        }
        //read the csv file as text with the onload behaviour set as above
        fileReader.readAsText(csvFileObj)
    }

    const prettyDisplay = () => {
        if(fileContents===""){return;}
        
        const rows = fileContents.split('\n').map( (v,idx) => {
            return ( 
                <tr key={idx}>
                    {v}
                </tr>)
            }
        );

        console.log("Rows are: " + rows)

        return (
            <table>
                {rows}
            </table>
        )
    }

    return(
        <>
            <h1>Accessing CSV Files</h1>
            <div>
                <label htmlFor="csv-selector">Select a file:</label>
                <input type="file"
                    id="csv-selector"
                    name="csv-selector"
                    accept=".csv"
                    onChange={ (e) => setCvsFileObj(e.target.files[0])}
                    multiple={false}/>
            </div>
            <div>
                <button onClick={onProcessCsvFile}> Process CSV File </button>
                {prettyDisplay()}
            </div>
            
        </>
    );
}

export default FileAccess;