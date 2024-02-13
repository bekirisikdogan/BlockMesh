<template>
  <div class="container">
    <!-- Title -->
    <h3>Elips Mesh Parametreleri Giriş Ekranı</h3>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <div class="panel panel-warning">
          <div class="panel-heading">
            <h4>Parametreler</h4>
          </div>
          <div class="panel-body">
            <form action="">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <!-- Parameters -->
                    <label>Merkez Koordinatlar(P)</label>
                    <div>
                    <label for="X">X</label>
                    <input type="number"
                           id="X"
                           class="form-control"
                           v-model="meshData.X" >

                    <label for="Y">Y</label>
                    <input type="number"
                           id="Y"
                           class="form-control"
                           v-model="meshData.Y" >
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="majorAxis">Büyük Eksen Uzunluğu</label>
                    <input type="number"
                           id="majorAxis"
                           class="form-control"
                           v-model="meshData.majorAxis">
                  </div>
                  <div class="form-group">
                    <label for="minorAxis">Küçük Eksen Uzunluğu</label>
                    <input type="number"
                           id="minorAxis"
                           class="form-control"
                           v-model="meshData.minorAxis">
                  </div>
                  <div class="form-group">
                    <label for="segmentsX">X Ekseni Parça Sayısı</label>
                    <input type="number"
                           id="segmentsX"
                           class="form-control"
                           v-model="meshData.segmentsX">
                  </div>
                  <div class="form-group">
                    <label for="segmentsY">Y Ekseni Parça Sayısı</label>
                    <input type="number"
                           id="segmentsY"
                           class="form-control"
                           v-model="meshData.segmentsY">
                  </div>
                  <!-- Result -->
                  <div class="form-group">
                    <label for="calculatedValue">Sonuç</label>
                      <p>{{meshData.result}}</p>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-md-12">
                  <!-- Buttons -->
                  <button @click="generateMesh($event)"
                          class="btn btn-primary">
                    Mesh Oluştur</button>
                  <button @click="endProcess"
                          class="btn btn-primary">
                    İşlemi Sonlandır</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // It allows http requests
  import axios from "axios";
  import {ref} from "vue";
  export default {
    // It holds defined parameters
    data()  {
      return{
        meshData : {
          X : null,
          Y : null,
          majorAxis : null,
          minorAxis : null,
          segmentsX : null,
          segmentsY : null,
          result : null,
        }
      }
    },

    methods:{
       generateMesh(event){
         // It prevent the form from being reset
         event.preventDefault()

         // It used to send form data to a server
         const response =  axios.post("http://localhost:5000/getCalculation", {
           x:this.meshData.X,
           y:this.meshData.Y,
           majorAxis:this.meshData.majorAxis,
           minorAxis:this.meshData.minorAxis,
           segmentsX:this.meshData.segmentsX,
           segmentsY:this.meshData.segmentsY
        }, {
           headers: {
             'Content-type': 'application/json',
           }
        }).then((response)=>{
          //console.log(response.data)
          //console.log(this.meshData.result)
          this.meshData.result = response.data
        })
      },

      endProcess(){
        alert('İşlem sonlandırılmıştır.');
      },

      },
      beforeMount() {
        this.generateMesh();
      }
  }
</script>

<style>

</style>
