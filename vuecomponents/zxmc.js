define(['lodash','zxcore'],function(_,zxcore){
    'use strict';
    let vueSelectMember = {
        props:[
            'labelInput',
            'chooseButton',
            'inputName',
        ],
        data:function(){
            return {
                searchInputs: '',
                options:[],
                chooses:'',
            }
        },
        watch: {
            searchInputs: _.debounce(
                function(newVal,oldVal) {
                    let str = newVal.replace(/^\s+|\s+$/g, '');
                    if (str) {
                        let that = this;
                        axios.post('/hr/employerSearch', {data: str}).then(function(response) {
                            if(response.data.length>0){
                                that.options = response.data;
                            }
                        });
                    }
                    else {
                        console.log('没有收入有效值!');
                    }
                }, 1000),
        },
        methods: {
            chooseName: function(index) {
                let user = this.options[index];
                if(user.grade_id!=1){
                    zxcore.ToastSuccess('当前用户不是组长');
                    return;
                }
                this.chooses = this.options[index];
            },
            removeTag:function(index){
                this.chooses='';
            }
        },
        template:`
            <div class="form-group row ">
                <label for="title" class="col-sm-2 col-form-label">{{labelInput}}</label>
                <div class="col-sm-9 row">
                    <div class="bootstrap-tagsinput badge-primary " v-if="chooses">
                        <span class="tag badge" >{{chooses.name}}<span data-role="remove" @click="removeTag()"></span></span>
                        <input type="text" placeholder="" v-model="chooses.id" :name="inputName" hidden >
                    </div>
                    <div class="dropdown bootstrap-select col-sm-2">
                        <button type="button"
                                class="btn dropdown-toggle bs-placeholder select-with-transition btn-outline-primary btn-round"
                                data-toggle="dropdown" role="button" aria-expanded="false">
                            <div class="filter-option">
                                <div class="filter-option-inner">
                                    <div class="filter-option-inner-inner">{{chooseButton}}</div>
                                </div>
                            </div>
                        </button>
                        <div class="dropdown-menu" role="combobox" x-placement="bottom-start"
                             style="overflow: hidden; position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 43px, 0px);">
                            <div class="inner show" role="listbox" aria-expanded="false" tabindex="-1"
                                 style="overflow-y: auto;">
                                <ul class="dropdown-menu inner show">
                                    <li class="disabled">
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="searchInputs" placeholder="在这里搜索">
                                        </div>
                                    </li>
                                    <li v-for="(items,index) in options">
                                        <a role="option" class="dropdown-item" aria-disabled="false" tabindex="0"
                                           aria-selected="false" @click="chooseName(index)">
                                            <tr>
                                                <th>{{items.id}}</th>
                                                <th>{{items.name}}</th>
                                                <th>{{items.phone}}</th>
                                            </tr>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `
    };
    return vueSelectMember;
});