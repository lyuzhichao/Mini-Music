export default function stringToNodes(keyword,searchValue) {
    const nodes=[]
    if (keyword.toUpperCase().startsWith(searchValue.toUpperCase())){
        const key1=keyword.slice(0,searchValue.length)
        const node1={
            name:'span',
            attrs:{style:'color:#26ce8a;'},
            children:[{type:'text',text:key1}]
        }
        nodes.push(node1)

        const key2=keyword.slice(searchValue.length)
        const node2={
            name:'span',
            attrs:{style:'color:#000000;'},
            children:[{type:'text',text:key2}]
        }
        nodes.push(node2)
    } else {
        const node={
            name:'span',
            attrs:{style:'color:#000000;'},
            children:[{type:'text',text:keyword}]
        }
        nodes.push(node)
    }
    return nodes
}