let pb  = function (callback) {
    return function (...args) {
        let firstParameter = args[0];

        if (firstParameter === pb.BREAK) {
            return pb.BREAK;
        }

        if (firstParameter === pb.SKIP_NEXT) {
            return;
        }

        let result = callback.apply(null, args);

        if (result === pb.BREAK) {
            return pb.BREAK;
        }

        if (result === pb.SKIP_NEXT) {
            return pb.SKIP_NEXT;
        }

        return result;
    };
};

pb.BREAK = {};
pb.SKIP_NEXT = {};

module.exports = pb;