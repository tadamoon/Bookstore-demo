// return a function that accepts a function(func) and executes that function, catches any errors and 
//passes the errors to next
module.exports=func=>{
    return (req, res, next)=>{
        func(req, res, next).catch(next)
    }
}