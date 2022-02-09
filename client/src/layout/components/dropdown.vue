
<template>
  <div>
    <v-navigation-drawer
      v-if="menus"
      :mini-variant="$vuetify.breakpoint.mdAndDown"
      :value="primaryDrawer"
      app
      class="font-weight-bold subtitle-1"
      clipped
      color="drawer"
      width="200"
      @input="$emit('update:primaryDrawer', $event)"
    >
      <v-treeview
        :active.sync="active"
        :items="menus"
        activatable
        active-class="cor-fundo desativa-duplo-click"
        color="surface"
        class="menu"
        item-key="id"
        item-text="description"
        item-name="description"
        loading-icon="mdi-cogs"
        open-on-click
        return-object
      >
        <!-- item-children="filhos" -->
        <template v-slot:append="{ item, open }">
          <div
            v-if="item.children"
            class="mr-2"
          >
            <v-icon v-if="open">
              mdi-menu-down
            </v-icon>
            <v-icon v-else>
              mdi-menu-right
            </v-icon>
          </div>
        </template>
        <template v-slot:prepend="{ item, active }">
          <v-icon
            v-if="item.icon"
            :color="item.icon_color"
            class="pr-1"
            v-text="`${item.id ? item.icon : ''}`"
          />
        </template>
      </v-treeview>
    </v-navigation-drawer>
    <v-style>
      .cor-fundo {
      border-left: 10px solid {{ $vuetify.theme.isDark ? $vuetify.theme.themes.dark.primary : $vuetify.theme.themes.light.primary }} !important;
      opacity: 0.9 !important;
      background-color: #ccc !important;
      }
    </v-style>
  </div>
</template>

<script>
export default {
  name: 'ComponenteDrawer',

  props: {
    menusUsuario: {
      required: true,
      validator: function (value) {
        return (
          typeof value === 'undefined' ||
          typeof value === 'number' ||
          Array.isArray(value) ||
          typeof value === 'string' ||
          value === null
        )
      }
    },
    primaryDrawer: {
      required: true,
      type: Boolean
    }
  },

  data: () => ({
    ativo: [],
    menus: []
  }),

  computed: {
    active: {
      get () {
        return this.ativo
      },
      set (valor) {
        if (valor.length) {
          this.ativo = []
          this.ativo.push(valor[0])

          if (valor[0].url !== this.$route.path) {
            this.$router.push(valor[0].url)
          }
        }
      }
    }
  },

  watch: {
    menusUsuario (valor) {
      if (valor) {
        this.menus = (JSON.parse(window.atob(this.menusUsuario)))
      }
    }
  },

  created () {
    this.refreshMenu()
  },

  methods: {
    findByUrlRouter (tree, url) {
      for (let node of tree) {
        if (node.url === url) return node

        if (node.children) {
          let nodeChildren = this.findByUrlRouter(node.children, url)
          if (nodeChildren) return nodeChildren
        }
      }
      return false
    },

    refreshMenu () {
      this.menus = JSON.parse(window.atob(this.menusUsuario))
      this.ativo = []
      this.ativo.push(this.findByUrlRouter(this.menus, this.$route.path))
    }
  }
}
</script>

<style lang="scss">
.menu {
  .v-treeview-node__root:hover > .v-treeview-node__content > .v-treeview-node__prepend > .v-icon {
    color: #506577 !important;
    caret-color: #506577 !important;
  }
  .v-treview-node--leaf > .v-treeview-node__root:hover,
    .v-treeview-node--click > .v-treeview-node__root:hover {
    border-left: 10px solid #5c5c5c !important;
    opacity: 0.8 !important;
  }
  .v-treeview-node__level {
    width: 15px !important;
  }
  .v-treview-node--leaf > .v-treeview-node__root,
    .v-treeview-node--click > .v-treeview-node__root {
    padding-left: 0px !important;
  }
  .v-treeview-node__root {
    height: 55px !important;
    border-bottom: 1px solid rgba(200,214,229,0.3) !important;
  }

  .v-treeview-node__toggle {
    visibility: hidden;
    width: 15px !important;
  }
  .desativa-duplo-click {
    pointer-events: none !important;
  }
}
</style>
