(this.webpackJsonpcanvas=this.webpackJsonpcanvas||[]).push([[0],{136:function(e,t){},137:function(e,t){},138:function(e,t){},140:function(e,t,n){"use strict";n.r(t);var s,a=n(4),c=n(0),i=n.n(c),r=n(13),o=n.n(r),u=n(164),l=n(165),h=n(18),d=n.n(h),b=d()((function(){return{progressWrapper:{display:"flex",justifyContent:"center",alignItems:"center"}}})),j=function(e){var t=e.loading,n=e.children,s=b();return Object(a.jsxs)(i.a.Fragment,{children:[Object(a.jsx)(u.a,{}),Object(a.jsx)("div",{children:t?Object(a.jsx)("div",{className:s.progressWrapper,children:Object(a.jsx)(l.a,{})}):n})]})},v=n(66),f=n(5),O=d()((function(e){return{button:{display:"inline-block",cursor:"pointer",color:"#fff",paddingTop:e.spacing(.5),paddingBottom:e.spacing(.5),paddingRight:e.spacing(3),paddingLeft:e.spacing(3),textAlign:"center"},caption:{fontSize:"0.70rem"},selected:{background:"linear-gradient(90deg, rgba(172,118,255,1) 0%, rgba(91,91,255,1) 100%)"}}})),p=function(e){var t=e.icon,n=e.text,s=e.onClick,c=e.selected,i=O();return Object(a.jsxs)("div",{className:Object(f.a)(i.button,Object(v.a)({},i.selected,c)),onClick:s,children:[t,Object(a.jsx)("div",{className:i.caption,children:n})]})},g=n(166),x=n(167),y=n(23),C=n(11),S=n(14),w=n(9),T=n(20);!function(e){e[e.SELECT=0]="SELECT",e[e.BRUSH=1]="BRUSH",e[e.SHAPE=2]="SHAPE"}(s||(s={}));var k=n(69),E=n(68),P=function(){function e(t){Object(C.a)(this,e),this.canvasStore=t}return Object(S.a)(e,[{key:"resetCanvas",value:function(){this.canvasStore.canvas.isDrawingMode=!1,this.canvasStore.selectable=!1,this.canvasStore.canvas.defaultCursor="default",this.canvasStore.canvas.discardActiveObject().renderAll()}},{key:"select",value:function(){this.resetCanvas(),this.setTool()}}]),e}(),m=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,null,[{key:"getInstance",value:function(e){switch(e.selectedTool){case s.SELECT:return new _(e);case s.BRUSH:return new M(e);case s.SHAPE:return new I(e);default:return new M(e)}}}]),e}(),_=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){return Object(C.a)(this,n),t.apply(this,arguments)}return Object(S.a)(n,[{key:"setTool",value:function(){this.canvasStore.selectable=!0}}]),n}(P),M=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){return Object(C.a)(this,n),t.apply(this,arguments)}return Object(S.a)(n,[{key:"setTool",value:function(){this.canvasStore.canvas.isDrawingMode=!0}}]),n}(P),I=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){return Object(C.a)(this,n),t.apply(this,arguments)}return Object(S.a)(n,[{key:"setTool",value:function(){this.canvasStore.canvas.defaultCursor="crosshair"}}]),n}(P),B=n(67),N=10,R=function(){function e(t){Object(C.a)(this,e),this.canvasStore=t,this.shareObject={e:{},canvasStore:this.canvasStore,startCursorPosition:{x:0,y:0},currentCursorPosition:{x:0,y:0},isDown:!1}}return Object(S.a)(e,[{key:"init",value:function(){this.canvasStore.canvas.on(e.MOUSE_UP,this.handleMouseUp.bind(this)),this.canvasStore.canvas.on(e.MOUSE_MOVE,this.handleMouseMove.bind(this)),this.canvasStore.canvas.on(e.MOUSE_DOWN,this.handleMouseDown.bind(this))}},{key:"handleMouseUp",value:function(e){var t;this.shareObject.e=e,this.shareObject.isDown=!1,null===(t=A.getInstance(this.canvasStore))||void 0===t||t.handle(this.shareObject)}},{key:"handleMouseDown",value:function(e){var t;this.shareObject.e=e,this.shareObject.isDown=!0,this.shareObject.startCursorPosition=Object(B.a)({},this.getCursorPosition(e)),this.shareObject.currentCursorPosition=Object(B.a)({},this.getCursorPosition(e)),null===(t=L.getInstance(this.canvasStore))||void 0===t||t.handle(this.shareObject)}},{key:"handleMouseMove",value:function(e){var t;(this.shareObject.e=e,this.shareObject.currentCursorPosition=Object(B.a)({},this.getCursorPosition(e)),this.shareObject.isDown)&&(null===(t=U.getInstance(this.canvasStore))||void 0===t||t.handle(this.shareObject))}},{key:"getCursorPosition",value:function(e){return this.canvasStore.canvas.getPointer(e.e)}}]),e}();R.MOUSE_UP="mouse:up",R.MOUSE_DOWN="mouse:down",R.MOUSE_MOVE="mouse:move";var A=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,null,[{key:"getInstance",value:function(e){switch(e.selectedTool){case s.SHAPE:return new H;default:return null}}}]),e}(),L=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,null,[{key:"getInstance",value:function(e){switch(e.selectedTool){case s.SHAPE:return new D;default:return null}}}]),e}(),U=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,null,[{key:"getInstance",value:function(e){switch(e.selectedTool){case s.SHAPE:return new W;default:return null}}}]),e}(),H=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,[{key:"handle",value:function(e){if(e.object.isType("rect")||e.object.isType("triangle"))e.object.set({width:Math.max(N,e.object.width||N),height:Math.max(N,e.object.height||N)}).setCoords();else if(e.object.isType("circle")){var t=e.object;t.set("radius",Math.max(N,t.radius||N)).setCoords()}e.canvasStore.canvas.renderAll()}}]),e}(),D=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,[{key:"handle",value:function(e){e.object=e.canvasStore.shapeType.getShape({left:e.startCursorPosition.x,top:e.startCursorPosition.y,selectable:!1,hoverCursor:"default"}),e.object.isType("rect")||e.object.isType("triangle")?e.object.set({width:0,height:0}):e.object.isType("circle")&&e.object.set("radius",0),e.canvasStore.canvas.add(e.object)}}]),e}(),W=function(){function e(){Object(C.a)(this,e)}return Object(S.a)(e,[{key:"handle",value:function(e){e.currentCursorPosition.x<e.startCursorPosition.x&&e.object.set("left",Math.abs(e.currentCursorPosition.x)),e.currentCursorPosition.y<e.startCursorPosition.y&&e.object.set("top",Math.abs(e.currentCursorPosition.y)),e.object.isType("rect")||e.object.isType("triangle")?e.object.set({width:Math.abs(e.startCursorPosition.x-e.currentCursorPosition.x),height:Math.abs(e.startCursorPosition.y-e.currentCursorPosition.y)}):e.object.isType("circle")&&e.object.set("radius",Math.abs(e.startCursorPosition.x-e.currentCursorPosition.x)),e.canvasStore.canvas.renderAll()}}]),e}(),G=function(){function e(t,n){Object(C.a)(this,e),this.value=t,this.display=n,e._values.push(this)}return Object(S.a)(e,[{key:"getBrush",value:function(t){switch(this){case e.PENCIL:return new T.fabric.PencilBrush(t);case e.CIRCLE:return new T.fabric.CircleBrush(t);case e.SPRAY:return new T.fabric.SprayBrush(t);default:return new T.fabric.PencilBrush(t)}}}],[{key:"values",value:function(){return this._values}},{key:"valueOf",value:function(e){return this.values().find((function(t){return t.value===e}))}}]),e}();G._values=[],G.PENCIL=new G("pencil","\uc5f0\ud544"),G.CIRCLE=new G("circle","\uc6d0\ud615"),G.SPRAY=new G("spray","\uc2a4\ud504\ub808\uc774");var J=function(){function e(t,n){Object(C.a)(this,e),this.value=t,this.display=n,e._values.push(this)}return Object(S.a)(e,[{key:"getShape",value:function(t){switch(this){case e.RECT:return new T.fabric.Rect(t);case e.CIRCLE:return new T.fabric.Circle(t);case e.TRIANGLE:return new T.fabric.Triangle(t);default:return new T.fabric.Rect(t)}}}],[{key:"values",value:function(){return this._values}},{key:"valueOf",value:function(e){return this.values().find((function(t){return t.value===e}))}}]),e}();J._values=[],J.RECT=new J("rect","\uc0ac\uac01\ud615"),J.CIRCLE=new J("circle","\uc6d0"),J.TRIANGLE=new J("triangle","\uc0bc\uac01\ud615");var V=function(){function e(){Object(C.a)(this,e),this.canvasId="canvas",this._canvas={},this._width=500,this._height=500,this._backgroundColor="white",this._selectedTool=s.SELECT,this._selectable=!1,this._brushType=G.PENCIL,this._shapeType=J.RECT,Object(w.k)(this)}return Object(S.a)(e,[{key:"initCanvas",value:function(e,t){this._canvas=new T.fabric.Canvas(e,t),this.selectedTool=this._selectedTool,new R(this).init()}},{key:"canvas",get:function(){return this._canvas}},{key:"width",get:function(){return this._width},set:function(e){this._width=e}},{key:"height",get:function(){return this._height},set:function(e){this._height=e}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(e){this._backgroundColor=e}},{key:"selectedTool",get:function(){return this._selectedTool},set:function(e){this._selectedTool=e,m.getInstance(this).select()}},{key:"selectable",get:function(){return this._selectable},set:function(e){this.canvas.selection=e,this.canvas.getObjects().forEach((function(t){t.selectable=e,t.hoverCursor=e?"move":"default"}))}},{key:"brushType",get:function(){return this._brushType},set:function(e){this._brushType=e,this.canvas.freeDrawingBrush=e.getBrush(this.canvas)}},{key:"shapeType",get:function(){return this._shapeType},set:function(e){this._shapeType=e}}]),e}(),Y=new function e(){Object(C.a)(this,e),this.canvasStore=void 0,this.canvasStore=new V},z=i.a.createContext(Y),F=function(e){var t=e.children;return Object(a.jsx)(z.Provider,{value:Y,children:t})},q=function(){return i.a.useContext(z)},K=n(95),Q=n.n(K),X=n(97),Z=n.n(X),$=n(96),ee=n.n($),te=d()((function(){return{appBarColor:{backgroundColor:"rgba(30,30,30,0.95)"},left:{justifyContent:"flex-start"},center:{display:"flex",flex:1,justifyContent:"center"},right:{justifyContent:"flex-end"}}})),ne=Object(y.a)((function(){var e=te(),t=q().canvasStore;return Object(a.jsx)(g.a,{classes:{colorDefault:e.appBarColor},color:"default",elevation:0,children:Object(a.jsxs)(x.a,{variant:"dense",children:[Object(a.jsx)("div",{className:e.left}),Object(a.jsxs)("div",{className:e.center,children:[Object(a.jsx)(p,{icon:Object(a.jsx)(Q.a,{}),text:"\uc120\ud0dd",onClick:function(){return t.selectedTool=s.SELECT},selected:t.selectedTool===s.SELECT}),Object(a.jsx)(p,{icon:Object(a.jsx)(ee.a,{}),text:"\ube0c\ub7ec\uc2dc",onClick:function(){return t.selectedTool=s.BRUSH},selected:t.selectedTool===s.BRUSH}),Object(a.jsx)(p,{icon:Object(a.jsx)(Z.a,{}),text:"\uc170\uc774\ud504",onClick:function(){return t.selectedTool=s.SHAPE},selected:t.selectedTool===s.SHAPE})]}),Object(a.jsx)("div",{className:e.right})]})})})),se=n(168),ae=n(170),ce=n(169),ie=d()((function(e){return{title:{marginBottom:e.spacing(3)},input:{padding:e.spacing(1),borderRadius:4,backgroundColor:"#fff"}}})),re=Object(y.a)((function(){var e=ie(),t=q().canvasStore;return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:e.title,children:Object(a.jsx)(se.a,{variant:"h6",color:"primary",children:"\ube0c\ub7ec\uc2dc"})}),Object(a.jsxs)("div",{children:[Object(a.jsx)(ae.a,{mb:1,children:Object(a.jsx)(se.a,{variant:"caption",children:"\ubaa8\uc591"})}),Object(a.jsx)(ce.a,{className:e.input,native:!0,onChange:function(e){t.brushType=G.valueOf(e.target.value)||G.PENCIL},value:t.brushType.value,label:"\ube0c\ub7ec\uc2dc \ubaa8\uc591",fullWidth:!0,children:G.values().map((function(e){return Object(a.jsx)("option",{value:e.value,children:e.display},e.value)}))})]})]})})),oe=d()((function(e){return{title:{marginBottom:e.spacing(3)},input:{padding:e.spacing(1),borderRadius:4,backgroundColor:"#fff"}}})),ue=Object(y.a)((function(){var e=oe(),t=q().canvasStore;return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:e.title,children:Object(a.jsx)(se.a,{variant:"h6",color:"primary",children:"\uc170\uc774\ud504"})}),Object(a.jsxs)("div",{children:[Object(a.jsx)(ae.a,{mb:1,children:Object(a.jsx)(se.a,{variant:"caption",children:"\ubaa8\uc591"})}),Object(a.jsx)(ce.a,{className:e.input,native:!0,onChange:function(e){t.shapeType=J.valueOf(e.target.value)||J.CIRCLE},value:t.shapeType.value,label:"\uc170\uc774\ud504 \ubaa8\uc591",fullWidth:!0,children:J.values().map((function(e){return Object(a.jsx)("option",{value:e.value,children:e.display},e.value)}))})]})]})})),le=d()((function(e){return{root:{padding:e.spacing(3)}}})),he=Object(y.a)((function(){var e=le(),t=q().canvasStore.selectedTool;return Object(a.jsxs)("div",{className:e.root,children:[t===s.BRUSH&&Object(a.jsx)(re,{}),t===s.SHAPE&&Object(a.jsx)(ue,{})]})})),de=d()((function(e){return{root:{display:"flex",flexDirection:"column",width:"100vw",height:"100vh"},flexBox:{display:"flex",flex:1},contents:{display:"flex"},left:{flexBasis:"".concat(240,"px"),backgroundColor:"#f0f0f0"},canvasWrapper:{display:"flex",justifyContent:"center",alignItems:"center",flex:1,backgroundColor:"#c0c0c0",padding:e.spacing(3)}}})),be=Object(y.a)((function(){var e=de(),t=q().canvasStore;return i.a.useEffect((function(){var e=document.getElementById(t.canvasId);t.initCanvas(e,{width:t.width,height:t.height,backgroundColor:t.backgroundColor})}),[]),Object(a.jsxs)(j,{children:[Object(a.jsx)(ne,{}),Object(a.jsxs)("div",{className:e.root,children:[Object(a.jsx)(x.a,{variant:"dense"}),Object(a.jsxs)("div",{className:e.flexBox,children:[Object(a.jsx)("div",{className:e.left,children:Object(a.jsx)(he,{})}),Object(a.jsx)("div",{className:e.canvasWrapper,children:Object(a.jsx)("canvas",{id:t.canvasId})})]})]})]})}));var je=function(){return Object(a.jsx)(be,{})};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(F,{children:Object(a.jsx)(je,{})})}),document.getElementById("root"))}},[[140,1,2]]]);
//# sourceMappingURL=main.d42d355d.chunk.js.map