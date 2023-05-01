var data = {
	width: 0, height: 0,
	cx: 0, cy: 0,
	numVertexes: 6,
	numPolygons: 34,
	radiusCoef: 6.3,
	strokeWidth: 6.3,
	opacity: 0.1,
	animationDuration: 10,
	animationDelay: 0.2
  };
  
//const gui = new dat.GUI();
//gui.add(data, 'numVertexes', 3, 16, 1);
//gui.add(data, 'numPolygons', 5, 100, 1);
//gui.add(data, 'radiusCoef', 1, 20);
//gui.add(data, 'strokeWidth', 0.1, 5, 0.1);
//gui.add(data, 'opacity', 0.1, 1, 0.1);
//gui.add(data, 'animationDuration', 1, 20, 1);
//gui.add(data, 'animationDelay', 0.1, 1, 0.1);
//gui.close();
  
  var app = new Vue({
	el: '#app',
	data: data,
	mounted() {
	  this.onResize();
	  window.addEventListener('resize', this.onResize);
	},
	computed: {
	  transform() {
		return 'translate(' + this.cx + ', ' + this.cy + ')';
	  }
	},
	methods: {
	  onResize() {
		const r = this.$refs.svg.getBoundingClientRect();
		this.width = r.width;
		this.height = r.height;
		this.cx = r.width / 2;
		this.cy = r.height / 2;
	  },
	  tkey(i) {
		return this.numPolygons + '-' + this.radiusCoef + '-' + this.strokeWidth + '-' + this.opacity + '-' + this.animationDuration + '-' + this.animationDelay + '-' + i;
	  },
	  points(i) {
		var r = i * this.radiusCoef;
		return this.ppoints(this.numVertexes, 0, 0, r, 0);
	  },
	  ppoints(n, x, y, s, r) {
		var dt = 2 * Math.PI / n;
		var points = [];
		for (var i = 0; i < n; i++) {
		  var t = r + i * dt;
		  var px = x + Math.cos(t) * s;
		  var py = y + Math.sin(t) * s;
		  points.push(px + ',' + py);
		}
		return points.join(' ');
	  },
	  style(i) {
		return {
		  'fill': 'rgba(255,255,255,'+this.opacity+')',
		  'stroke-width': this.strokeWidth,
		  'animation-delay': -(2+this.animationDelay * i) + 's',
		  'animation-duration': this.animationDuration + 's'
		};
	  }
	}
  });
  