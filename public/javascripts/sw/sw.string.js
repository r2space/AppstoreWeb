$sw.string = {
    copyByLeft: function(left, right) {
        if(!right)
            return;
        for(var key in left) {
            if(right[key])
                left[key] = right[key];
        }
    }
};