$(".submit").on("click", () => {
    var head = $("#heading").val(); 
    var cont = $("#content").val(); 
    send(head,cont);
});

async function send(head,cont) {
    try {
        
        var response = await fetch("http://localhost:3000/send", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ heading: head,content:cont }) 
        });
        if (response.ok) {
            console.log(response);
            window.location.href = "/";
        } else {
            console.error("Failed to send blog post:", response.statusText);
        }
        


    } catch (error) {
        console.error("Error:", error);
    }
}