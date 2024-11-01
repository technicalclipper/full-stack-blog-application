$(".change").on("click",()=>{
    var heading=$("#heading").val();
    var content=$("#content").val();
    var index=$(".change").attr("data-id");
    send_data(heading,content,index);
})

async function send_data(head,cont,index) {
    try {
        
        var response = await fetch("http://localhost:3000/change", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ heading: head,content:cont,index: index}) 
        });
        if (response.ok) {
            
            window.location.href = "/";
        } else {
            console.error("Failed to send blog post:", response.statusText);
        }
        


    } catch (error) {
        console.error("Error:", error);
    }
}