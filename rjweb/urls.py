from django.conf.urls import patterns, url

from views import index, config, info, set_language, ping


urlpatterns = patterns('',
                       url(r'^$', index, name='index'),
                       url(r'^ping$', ping),
                       url(r'^language$', set_language),
                       url(r'^config.js$', config),
                       url(r'^info_allmant$', info, kwargs={'page': 'allmant'}),
                       url(r'^info_ansvar$', info, kwargs={'page': 'ansvar'}),
                       url(r'^info_bilInfo$', info, kwargs={'page': 'bilInfo'}),
                       url(r'^info_bussInfo$', info, kwargs={'page': 'bussInfo'}),
                       url(r'^info_bussInfoNerd$', info, kwargs={'page': 'bussInfoNerd'}),
                       url(r'^info_cykelInfo$', info, kwargs={'page': 'cykelInfo'}),
                       url(r'^info_data$', info, kwargs={'page': 'data'}),
                       url(r'^info_faq$', info, kwargs={'page': 'faq'}),
                       url(r'^info_framtid$', info, kwargs={'page': 'framtid'}),
                       url(r'^info_gangInfo$', info, kwargs={'page': 'gangInfo'}),
                       url(r'^info_ide$', info, kwargs={'page': 'ide'}),
                       url(r'^info_kartfunktion$', info, kwargs={'page': 'kartfunktion'}),
                       url(r'^info_rakna$', info, kwargs={'page': 'rakna'}),
                       url(r'^info_rattighet$', info, kwargs={'page': 'rattighet'}),
                       url(r'^info_redOsm$', info, kwargs={'page': 'redOsm'}),
                       url(r'^info_start$', info, kwargs={'page': 'start'}),
                       url(r'^info_tack$', info, kwargs={'page': 'tack'}),
)
