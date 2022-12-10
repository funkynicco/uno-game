// The vector class is immutable

function Vector(x, y) {
    this.x = x;
    this.y = y;
    
    this.print = function () {
        console.log(this.x, this.y);
    }
    
    this.distanceTo = function (target) {
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    this.length = function () {
        return Math.sqrt(this.x * this.x + this.y + this.y);
    }
    
    this.normalize = function () {
        const length = this.length();
        if (length === 0) {
            return new Vector(0, 0);
        }
        
        return new Vector(
            this.x / length,
            this.y / length
        );
    }

    this.add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    
    this.subtract = function (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    
    this.multiply = function (f) {
        return new Vector(this.x * f, this.y * f);
    }
    
    this.calculateLinearInterpolatedFactor = function (origin, destination) {
        let full_distance = origin.distanceTo(destination);
        if (full_distance === 0) {
            return 0;
        }
        
        let distance = this.distanceTo(destination);
        return distance / full_distance;
    }
}

export default Vector;
