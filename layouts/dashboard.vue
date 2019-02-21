<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider
            :trigger="null"
            collapsible
            v-model="collapsed"
        >   
            <a-row justify="center" style="margin-top:20px;">
                <a-col :span="24" style="text-align:center;">
                    <a-avatar :src="profile.picture" size="large"/>
                    <p style="color:white">{{ profile.name }}</p>
                </a-col>
            </a-row>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item key="1">
                    <a-icon type="user" />
                    <span>nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="video-camera" />
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3" @click="submitSignout">
                    <a-icon type="logout" />
                    <span>Logout</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> collapsed = !collapsed"
                />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <nuxt />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
export default {
    middleware: ['check-auth', 'authenticated'],
    data(){
        return {
            collapsed: false,
        }
    },
    computed: {
        profile() {
            return this.$store.getters['auth/getProfile']
        },
    },
    methods: {
        submitSignout() {
            this.$store.dispatch('auth/handleSignout')
        }
    }
}
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>

