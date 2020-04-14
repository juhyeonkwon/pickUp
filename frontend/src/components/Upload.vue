<template>
    <div class="container"> 
        <div class="upload">
            <label for="file">    
                <img src="../assets/plus.png" width="15%" height="15%" style="cursor:pointer" id="plus">
                <img id="preview" v-bind:src="url" width="50%" height="50%" style="cursor:pointer">

            </label>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload" /> <br/>
        <br />
        <br />

        </div>
        
        <div class="input"> 
                <label>상황</label>
                <b-form-input id="situation" v-model="situation" type="text" required placeholder="상황"></b-form-input> <br/>
                
                <label>아이템</label>
                <b-form-select id="situation" v-model="item" type="text" required placeholder="아이템" :options="optCategory">    
                    <option disabled value="아이템">아이템</option>
                    </b-form-select> <br/><br/>

                 <label>계절</label>
                 <b-form-select id="situation" v-model="season" type="text" required placeholder="계절" :options="optSeason">
                    <option disabled value="">계절</option>               
                </b-form-select> <br/><br/>

                <label>색깔</label>
                 <b-form-select id="situation" v-model="color" type="text" required placeholder="색깔" :options="optColor">
                    <option disabled value="">색깔</option>               
                </b-form-select> <br/><br/>

                 <label>비밀번호</label>
                 <b-form-input id="situation" v-model="password" type="password" required placeholder="비밀번호"></b-form-input> <br/>



            <br/>
                <b-button v-on:click="submitfile">업로드</b-button> &nbsp;
                <b-button v-on:click="cancel">취소</b-button> 
        </div>
    </div>
</template>

<script>
export default {
    created() {
    },
    data () {
        return {
            file: '',
            url : '',



            situation : '',
            season : '',
            item : '',
            category : '',
            password : '',
            color : '',

            optCategory : [
                {
                    label: "상의",
                    options: [
                        { value: 'short-sleeved shirt', text : '반팔 셔츠'},
                        { value: 'long-sleeve shirt',	text : '긴팔 셔츠'},
                        { value: 'sleeveless shirt',	text : '민소매 셔츠'},
                        { value: 'pique/collar',	    text : '피케/카라 티셔츠'},
                        { value: 'sweat shirts',	    text : '맨투맨/스웨트 셔츠'},
                        { value: 'hood',	            text : '후드'},
                        { value: 'vest',            	text : '베스트'},
                        { value: 'etc',                 text : '기타'}
                    ]
                }, 
                {
                    label: "아우터",
                    options: [
                        { value: 'blouson/MA-1',            text : '블루종/MA-1' },
                        { value: 'leather/rider jacket',    text : '레더/라이더스 재킷' },
                        { value: 'suit/blazer',             text : '수트/블레이저' },
                        { value: 'nylon/coach/anorak',      text : '나이론/코치/아노락' },
                        { value: 'training jacket',         text : '트레이닝 재킷' },
                        { value: 'stadium jacket',          text : '스타디움 재킷' },
                        { value: 'changing season coat',    text : '환절기 코트' },
                        { value: 'winter single coat',      text : '겨울 싱글 코트' },
                        { value: 'winter coat etc',         text : '겨울 기타 코트' },
                        { value: 'long padded jacket',      text : '롱 패딩' },
                        { value: 'short padded jacket',     text : '숏 패딩' },
                        { value: 'padded vest',             text : '패딩 베스트' },
                        { value: 'etc',                     text : '기타 아우터' },
                    ]
                },
                {
                    label: "원피스",
                    options: [
                        { value : 'mini onepiece',          text : '미니 원피스' },
                        { value : 'midi onepiece',          text : '미디 원피스' },
                        { value : 'mexim onepiece',         text : '맥심 원피스' },
                        { value : 'jumpsuit',               text : '점프수트' },
                    ]
                },
                {
                    label: "바지",
                    options: [
                        { value : 'denim pants',        text : '데님 팬츠' },
                        { value : 'cotton pants',       text : '코튼 팬츠' },
                        { value : 'suit pants/slex',    text : '수트 팬츠/ 슬랙스' },
                        { value : 'short pants',        text : '숏 팬츠' },
                        { value : 'leggings',           text : '레깅스' },
                        { value : 'etc',                text : '기타 바지' },
                    ]
                },
                {
                    label: "스커트",
                    options : [
                        { value : 'mini skirt',       text : '미니 스커트'},
                        { value : 'midi skirt',       text : '미디 스커트'},
                        { value : 'long skirt',       text : '롱 스커트'},
                    ]
                }
            ],

            optSeason : [
                { value : '1', text : "봄"},
                { value : '2', text : "여름"},
                { value : '3', text : "가을"},
                { value : '4', text : "겨울"}
            ],

            optColor : [
                { value : 'white', text : "흰색" }
            ]
        }
    },
    methods : {
        handleFileUpload : function() {
            console.log(this.$refs);
            this.file = this.$refs.file.files[0];
            this.url = URL.createObjectURL(this.file);

            document.getElementById("preview").style.display = "inline";
            document.getElementById("plus").style.display = "none";


        },
        submitfile : function() {
   
            let formData = new FormData();

            formData.append('file', this.file);
            formData.append('situation', this.situation);
            formData.append('item', this.item);
            formData.append('season', this.season);
            formData.append('color', this.color)
            formData.append('password', this.password);
 
        
            this.$http.post( 'api/upload', formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }                
                }).then(response => {
                    console.log(response.data)
                });
        },
        cancel : function() {

        }
    }
}
</script>

<style>

.upload {
    float : left;
    margin-left: 10%;
    margin-right: 5%;
    padding-left : 0;
    padding-top : 5%;
    width : 30%;    
    border : 1px solid black;
}

.input {
    float : left;
    width : 35%;
}

#preview {
    display:none;
}

#file {
    display: none;
}
</style>
