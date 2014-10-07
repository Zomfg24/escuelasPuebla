		/*Crea un constructor encargado de almacenar toda la informacion disponible de cada escuela*/
		function informacionEscuelas(){
			this._id= null,
			this.unidadQueAutoriza= "",
			this.nombre= "",
			this.clave= "",
			this.domicilio= "",
			this.nombreParticular= "",
			this.objetoPermiso= "",
			this.vigenciaInicio= "",
			this.vigenciaFin= "",
			this.procedimientoDelOtorgamiento= "",
			this.contraprestacion= "",
      this.formatoDomicilio,
			this.lat,
      this.lng,
      this.cambioFormato = function(){
        this.formatoDomicilio = this.domicilio;
        this.formatoDomicilio = this.formatoDomicilio.replace(/ /g,"+");
        this.formatoDomicilio = this.formatoDomicilio.replace("Pue.","Puebla");
        this.formatoDomicilio = this.formatoDomicilio.replace(/[\u0080-\u024F]/g,
                      function(a) {
                        return '&#'+a.charCodeAt(0);
                      });
        this.formatoDomicilio = this.formatoDomicilio.replace(/&#233/,"e");
        this.formatoDomicilio = this.formatoDomicilio.replace(/&#225/,"a");
        this.formatoDomicilio = this.formatoDomicilio.replace(/&#237/,"i");
        this.formatoDomicilio = this.formatoDomicilio.replace(/&#243/,"o");
        this.formatoDomicilio = this.formatoDomicilio.replace(/&#250/,"u");
        this.formatoDomicilio = this.formatoDomicilio.replace(/&#252/,"u");
      }
			this.domicilioACoordenadas = function(valor){
            var parametro = 'https://maps.googleapis.com/maps/api/geocode/json?'+'address='+this.formatoDomicilio+'&sensor=false';
            var data = 'AIzaSyD58YikEK-bFGRqilYtUUpwQW8HZ5zxeuQ';
            console.log(parametro);
            $.ajax({
              type:'Get',
              data: data,
              url: parametro,
              dataType: 'json',
              success: function(data) { //En caso de que se encuentre la informacion solicitada, desplegara lo siguiente
                console.log(data.status);
                  arregloEscuelas[registro].lat = data.results[0].geometry.location.lat;
                  arregloEscuelas[registro].lng = data.results[0].geometry.location.lng;
                }
              });
			}
			this.regresarInformacion = function(){
        $("#id").html(this._id);
        $("#unidadQueAutoriza").html(this.unidadQueAutoriza);
        $("#nombre").html(this.nombre);
        $("#clave").html(this.clave);
        $("#domicilio").html(this.domicilio);
        $("#nombreParticular").html(this.nombreParticular);
        $("#objetoPermiso").html(this.objetoPermiso);
        $("#vigenciaInicio").html(this.vigenciaInicio);
        $("#vigenciaFin").html(this.vigenciaFin);
        $("#procedimientoDelOtorgamiento").html(this.procedimientoDelOtorgamiento);
        $("#contraprestacion").html(this.contraprestacion);
			}
      this.marcadorMapa = function(){
        var mapProp = { //esta variable establece los parametros que tendra el mapa
        center:new google.maps.LatLng(this.lat,this.lng), //las cordenadas centran el mapa en puebla
        zoom:20,
        mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lat,this.lng),
          map: new google.maps.Map(document.getElementById("googleMap"),mapProp),
          title: this.nombre
        })
        this.regresarInformacion();
      }
      this.posicionarMapa =function(valor){
        registro = valor;
        this.cambioFormato();
        this.domicilioACoordenadas(valor);
        setTimeout('arregloEscuelas['+valor+'].marcadorMapa()',1000);
      }
		};
