import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7PageContent from './page-content';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-page',
  props: Object.assign({
    id: [String, Number],
    name: String,
    stacked: Boolean,
    withSubnavbar: {
      type: Boolean,
      default: undefined
    },
    subnavbar: {
      type: Boolean,
      default: undefined
    },
    withNavbarLarge: {
      type: Boolean,
      default: undefined
    },
    navbarLarge: {
      type: Boolean,
      default: undefined
    },
    noNavbar: Boolean,
    noToolbar: Boolean,
    tabs: Boolean,
    pageContent: {
      type: Boolean,
      default: true
    },
    noSwipeback: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true
    },
    ptrBottom: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        hasSubnavbar: false,
        hasNavbarLarge: false,
        routerPositionClass: '',
        routerForceUnstack: false,
        routerPageRole: null,
        routerPageMasterStack: false
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      name,
      pageContent,
      messagesContent,
      ptr,
      ptrDistance,
      ptrPreloader,
      ptrBottom,
      infinite,
      infiniteDistance,
      infinitePreloader,
      infiniteTop,
      hideBarsOnScroll,
      hideNavbarOnScroll,
      hideToolbarOnScroll,
      loginScreen,
      className,
      stacked,
      tabs,
      subnavbar,
      withSubnavbar,
      navbarLarge,
      withNavbarLarge,
      noNavbar,
      noToolbar,
      noSwipeback
    } = props;
    const fixedList = [];
    const staticList = [];
    const needsPageContent = pageContent;
    const {
      static: slotsStatic,
      fixed: slotsFixed,
      default: slotsDefault
    } = self.$slots;
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
    let hasSubnavbar;
    let hasMessages;
    let hasNavbarLarge;
    hasMessages = self.$options.propsData.messagesContent;

    if (slotsDefault) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        {
          const tag = child.tag;

          if (!tag) {
            if (needsPageContent) staticList.push(child);
            return;
          }

          if (tag.indexOf('subnavbar') >= 0) hasSubnavbar = true;

          if (tag.indexOf('navbar') >= 0) {
            if (child.componentOptions && child.componentOptions.propsData && 'large' in child.componentOptions.propsData && child.componentOptions.propsData !== false) hasNavbarLarge = true;
          }

          if (typeof hasMessages === 'undefined' && tag.indexOf('messages') >= 0) hasMessages = true;

          for (let j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixedTag = true;
            }
          }
        }

        if (needsPageContent) {
          if (isFixedTag) fixedList.push(child);else staticList.push(child);
        }
      });
    }

    const forceSubnavbar = typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar || this.state.hasSubnavbar : false;
    const forceNavbarLarge = typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined' ? hasNavbarLarge || this.state.hasNavbarLarge : false;
    const classes = Utils.classNames(className, 'page', this.state.routerPositionClass, {
      stacked: stacked && !this.state.routerForceUnstack,
      tabs,
      'page-with-subnavbar': subnavbar || withSubnavbar || forceSubnavbar,
      'page-with-navbar-large': navbarLarge || withNavbarLarge || forceNavbarLarge,
      'no-navbar': noNavbar,
      'no-toolbar': noToolbar,
      'no-swipeback': noSwipeback,
      'page-master': this.state.routerPageRole === 'master',
      'page-master-detail': this.state.routerPageRole === 'detail',
      'page-master-stacked': this.state.routerPageMasterStack === true
    }, Mixins.colorClasses(props));

    if (!needsPageContent) {
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id,
          'data-name': name
        }
      }, [slotsFixed, slotsStatic, slotsDefault]);
    }

    const pageContentEl = _h(F7PageContent, {
      attrs: {
        ptr: ptr,
        ptrDistance: ptrDistance,
        ptrPreloader: ptrPreloader,
        ptrBottom: ptrBottom,
        infinite: infinite,
        infiniteTop: infiniteTop,
        infiniteDistance: infiniteDistance,
        infinitePreloader: infinitePreloader,
        hideBarsOnScroll: hideBarsOnScroll,
        hideNavbarOnScroll: hideNavbarOnScroll,
        hideToolbarOnScroll: hideToolbarOnScroll,
        messagesContent: messagesContent || hasMessages,
        loginScreen: loginScreen
      }
    }, [slotsStatic, staticList]);

    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id,
        'data-name': name
      }
    }, [fixedList, slotsFixed, pageContentEl]);
  },

  created() {
    Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    const {
      ptr,
      infinite
    } = self.props;

    if (ptr) {
      el.addEventListener('ptr:pullstart', self.onPtrPullStart);
      el.addEventListener('ptr:pullmove', self.onPtrPullMove);
      el.addEventListener('ptr:pullend', self.onPtrPullEnd);
      el.addEventListener('ptr:refresh', self.onPtrRefresh);
      el.addEventListener('ptr:done', self.onPtrDone);
    }

    if (infinite) {
      el.addEventListener('infinite', self.onInfinite);
    }

    el.addEventListener('page:mounted', self.onPageMounted);
    el.addEventListener('page:init', self.onPageInit);
    el.addEventListener('page:reinit', self.onPageReinit);
    el.addEventListener('page:beforein', self.onPageBeforeIn);
    el.addEventListener('page:beforeout', self.onPageBeforeOut);
    el.addEventListener('page:afterout', self.onPageAfterOut);
    el.addEventListener('page:afterin', self.onPageAfterIn);
    el.addEventListener('page:beforeremove', self.onPageBeforeRemove);
    el.addEventListener('page:stack', self.onPageStack);
    el.addEventListener('page:unstack', self.onPageUnstack);
    el.addEventListener('page:position', self.onPagePosition);
    el.addEventListener('page:role', self.onPageRole);
    el.addEventListener('page:masterstack', self.onPageMasterStack);
    el.addEventListener('page:masterunstack', self.onPageMasterUnstack);
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
    el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
    el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
    el.removeEventListener('ptr:refresh', self.onPtrRefresh);
    el.removeEventListener('ptr:done', self.onPtrDone);
    el.removeEventListener('infinite', self.onInfinite);
    el.removeEventListener('page:mounted', self.onPageMounted);
    el.removeEventListener('page:init', self.onPageInit);
    el.removeEventListener('page:reinit', self.onPageReinit);
    el.removeEventListener('page:beforein', self.onPageBeforeIn);
    el.removeEventListener('page:beforeout', self.onPageBeforeOut);
    el.removeEventListener('page:afterout', self.onPageAfterOut);
    el.removeEventListener('page:afterin', self.onPageAfterIn);
    el.removeEventListener('page:beforeremove', self.onPageBeforeRemove);
    el.removeEventListener('page:stack', self.onPageStack);
    el.removeEventListener('page:unstack', self.onPageUnstack);
    el.removeEventListener('page:position', self.onPagePosition);
    el.removeEventListener('page:role', self.onPageRole);
    el.removeEventListener('page:masterstack', self.onPageMasterStack);
    el.removeEventListener('page:masterunstack', self.onPageMasterUnstack);
  },

  methods: {
    onPtrPullStart(event) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', event);
    },

    onPtrPullMove(event) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', event);
    },

    onPtrPullEnd(event) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', event);
    },

    onPtrRefresh(event) {
      const done = event.detail;
      this.dispatchEvent('ptr:refresh ptrRefresh', event, done);
    },

    onPtrDone(event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    },

    onInfinite(event) {
      this.dispatchEvent('infinite', event);
    },

    onPageMounted(event) {
      const page = event.detail;
      this.dispatchEvent('page:mounted pageMounted', event, page);
    },

    onPageStack() {
      this.setState({
        routerForceUnstack: false
      });
    },

    onPageUnstack() {
      this.setState({
        routerForceUnstack: true
      });
    },

    onPagePosition(event) {
      const position = event.detail.position;
      this.setState({
        routerPositionClass: `page-${position}`
      });
    },

    onPageRole(event) {
      this.setState({
        routerPageRole: event.detail.role
      });
    },

    onPageMasterStack() {
      this.setState({
        routerPageMasterStack: true
      });
    },

    onPageMasterUnstack() {
      this.setState({
        routerPageMasterStack: false
      });
    },

    onPageInit(event) {
      const page = event.detail;
      const {
        withSubnavbar,
        subnavbar,
        withNavbarLarge,
        navbarLarge
      } = this.props;

      if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length || page.$el.children('.navbar').find('.subnavbar').length) {
          this.setState({
            hasSubnavbar: true
          });
        }
      }

      if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.hasClass('navbar-inner-large')) {
          this.setState({
            hasNavbarLarge: true
          });
        }
      }

      this.dispatchEvent('page:init pageInit', event, page);
    },

    onPageReinit(event) {
      const page = event.detail;
      this.dispatchEvent('page:reinit pageReinit', event, page);
    },

    onPageBeforeIn(event) {
      const page = event.detail;

      if (page.from === 'next') {
        this.setState({
          routerPositionClass: 'page-next'
        });
      }

      if (page.from === 'previous') {
        this.setState({
          routerPositionClass: 'page-previous'
        });
      }

      this.dispatchEvent('page:beforein pageBeforeIn', event, page);
    },

    onPageBeforeOut(event) {
      const page = event.detail;
      this.dispatchEvent('page:beforeout pageBeforeOut', event, page);
    },

    onPageAfterOut(event) {
      const page = event.detail;

      if (page.to === 'next') {
        this.setState({
          routerPositionClass: 'page-next'
        });
      }

      if (page.to === 'previous') {
        this.setState({
          routerPositionClass: 'page-previous'
        });
      }

      this.dispatchEvent('page:afterout pageAfterOut', event, page);
    },

    onPageAfterIn(event) {
      const page = event.detail;
      this.setState({
        routerPositionClass: 'page-current'
      });
      this.dispatchEvent('page:afterin pageAfterIn', event, page);
    },

    onPageBeforeRemove(event) {
      const page = event.detail;
      this.dispatchEvent('page:beforeremove pageBeforeRemove', event, page);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};