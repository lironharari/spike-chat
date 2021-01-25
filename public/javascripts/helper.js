const ellipsify = (str) => (
    ((str.length > 10) ? `${str.substring(0, 10)}...` : str)
);

const getDate = () => (new Date().toLocaleString(
    [], 
    { hour: "2-digit", minute: "2-digit" }
    ));

const generateID = () => (
    Math.floor(Math.random() * 10000000)
); 

const getHost = () => (
    window.location.origin.replace(/^http/, "ws")
);