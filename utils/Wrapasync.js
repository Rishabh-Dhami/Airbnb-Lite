function Wrapasync(fn){
    return (req, res , next) => {
        fn(req, res, next).catch((e) => next(e));
    }
}


export {Wrapasync}