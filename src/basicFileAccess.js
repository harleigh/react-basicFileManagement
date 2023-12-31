//every begining has a begining, and this is this begining. And, being that
//this is the begining, take it with a grain of salt as there is quite a road
//yet being paved; as I am learning, all code and documentation are "as is"

import { useState } from "react";

/**
 * Component returns a very basic table of each row of the cvs file 
 */
function PrettyDisplay({fileContents}){

    if(fileContents===""){return;}
        
        /**
         * Split each row by new line, then stick each entry into its own
         * row--if we want to, later, we can make pretty columns too
         */
        const rows = fileContents.split('\n').map( (v,idx) => {
            return ( 
                <tr key={idx}>
                    <th>{v}</th>
                    
                </tr>)
            }
        );

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
}//end pretty display


/**
 * Basic component lets you pick a single csv file out and then
 * display the contents
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
            </div>
            <div>
                <PrettyDisplay fileContents={fileContents}/>
            </div>
        </>
    );
}//end file access component

//later, we can break the file access into another component;
// a parent that has a file component and a pretty display component

export default FileAccess;