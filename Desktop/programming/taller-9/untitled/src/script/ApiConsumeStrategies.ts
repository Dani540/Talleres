
export const animePopulation = (url : String) =>{
    let data = []
    // @ts-ignore
    fetch(url).then(r => r.json()).then(json =>{
        console.log(json)
        data.push('Msg is: ' + json.msg)
        // json.data.forEach(item =>{
        //     data.push("Country: " + item.country)
        //     data.push("Code: " + item.code)
        //     data.push("Population Counts: ")
        //     item.populationCounts.forEach(p =>{
        //         data.push(item)
        //     })
        // })
        return data;
    }).catch(error => {
        console.error(error);
        data.push("Ocurrieron errores mientras se consumía la API Y Y")
    });

    return data;
}

