
<template>
    <div id="calen" >
        <ve-calendar id="roles" v-model="selected" :height="height" :lunar="lunar" :event="event" :pick-mode="pickMode" :offDays="offDays" :mode="mode" :most-choice="mostChoice" @refresh-calendar="refreshC"   :cross-month="crossMonth" @append-event="appendEvent"  @click-event="clickEvent" >
            <!--<div slot="day-number" slot-scope="{day}">-->
                <!--<span :style="day.sMonth===month&&test.indexOf(day.sDay)>=0?'color:red;':''">{{day.sDay}}</span>-->
            <!--</div>-->
            <div slot="day-event" slot-scope="{day,popMenu}">
                <div v-if="test.indexOf(day.sDay)>=0">
                    <div @click="popMenu($event,{day,item})" style="color:red;">{{item}}</div>
                </div>
            </div>
            <!-- <div slot="day-event-left-menu" slot-scope="{currentEvent}">

                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div @click="deleteEvent(currentEvent.item)" class="day-event-menu-item">使用插槽控制菜单</div>
            </div> -->

            <!-- <div slot="day-event-right-menu" slot-scope="{currentEvent}" >
                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div class="day-event-menu-item">右键插槽控制菜单</div>
            </div> -->

        </ve-calendar>

    </div>
</template>

<script>
import veCalendar from "ve-calendar";

export default {
    name: "calen",
    data() {
        return {
            modeList: ["mini", "normal", "auto"],
            modeIndex: 0,
            mode: "",
            item:"",
            lunar:true,
            offDays:[],
            pickMode:false,
            mostChoice:-1,
            crossMonth:true,
            event:true,
            activateDate: {
                year: 2017,
                month: 6
            },
            height:'500px',
            month: 6,
            test: [2],
            selected: []
        };
    },
    methods: {
        changeMode() {
            this.modeIndex++;
            this.mode = this.modeList[this.modeIndex % 3];
        },
        setOffDays(){


            this.offDays = JSON.parse(JSON.stringify(this.selected))
            this.selected = []
        },
        refreshC(yearmonth, data) {
            // console.log(yearmonth, data);
        },
        clickEvent(e, data) {
            // console.log(e, data);
        },
        deleteEvent(item) {
            // console.log(`你打算删除事情${item}`);
        },
        appendEvent(day) {
            // console.log("appendEvent", day);
        }
    },
    mounted() {
        this.changeMode();
    },
    components: {
        veCalendar
    }
};
</script>

<style scoped>
.calen{
   display: flex;
}
.roles{
    align-items: center;
    justify-content: center;
}
    .demo-div {
        padding: 20px;
        height: 200px;
    }

    .demo-div div {
        margin-top: 10px;
    }
</style>
