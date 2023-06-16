import Head from 'next/head'
import styles from '/styles/saas/pages/index.module.scss'
import { InferGetServerSidePropsType } from 'next'
import {
  Footer,
  Header,
  HowToUse,
  LoanSection,
  Banner,
  ContactUs,
  CarList,
  Testimony,
  Recommendation,
  Article,
  OTRSecondary,
  Floating,
  OTRPrimary,
  Search,
  LocationList,
  LocationSelector,
  Refinancing,
  CarofTheMonth,
  Offering,
  Video,
  Simple,
  AnnouncementBox,
  LoginModal,
} from 'components/molecules'
import { api } from 'services/api'
import { useContext, useEffect, useState } from 'react'
import amplitude from 'amplitude-js'
import { useIsMobile, utmCollector } from 'utils'
import { ConfigContext, ConfigContextType } from 'services/context'
import { useRouter } from 'next/router'

export default function Index({
  dataBanner,
  dataMenu,
  dataCities,
  dataTestimony,
  dataRecToyota,
  dataRecMVP,
  dataUsage,
  dataMainArticle,
  dataTypeCar,
  dataCarofTheMonth,
  dataMeta,
}: InferGetServerSidePropsType<any>) {
  const isMobile = useIsMobile()
  const { saveUTM } = useContext(ConfigContext) as ConfigContextType
  const [modalType, setModalType] = useState<string>('')
  const [isAnnouncementBoxShow, setIsAnnouncementBoxShow] =
    useState<boolean>(true)

  useEffect(() => {
    setModalType(isDataLocationNull() ? 'modalOTRPrimary' : '')
    amplitude.getInstance().logEvent('WEB_LANDING_PAGE_VIEW')
    saveDataUTM()
  }, [])

  const isDataLocationNull = () => {
    const dataLocal = localStorage.getItem('cityOtr')
    return dataLocal === null
  }

  const saveDataUTM = (): void => {
    const dataUTM = utmCollector()
    saveUTM(dataUTM)
  }

  const renderModal = (key: string): JSX.Element => {
    switch (key) {
      case 'modalOTRSecondary':
        return (
          <OTRSecondary data={dataCities} onClick={() => setModalType('')} />
        )
      case 'modalOTRPrimary':
        return <OTRPrimary data={dataCities} onClick={() => setModalType('')} />
      case 'modalSearch':
        return <Search onSearchMobileClose={() => setModalType('')} />
      case 'modalLocationList':
        return (
          <LocationSelector
            data={dataCities}
            onCloseSelector={() => setModalType('')}
          />
        )
      case 'modalVideo':
        return <Video onClick={() => setModalType('')} />
      case 'modalThankyou':
        return <Simple onCloseModal={() => setModalType('')} />
      case 'modalOffering':
        return (
          <Offering
            openLoginModal={() => setModalType('modalLogin')}
            openThankyouModal={() => {
              setModalType('modalThankyou')
            }}
            closeOfferingModal={() => setModalType('')}
          />
        )
      case 'modalLogin':
        return <LoginModal onCloseModal={() => setModalType('')} />
      default:
        return <></>
    }
  }

  const dataMetas = [
    {
      id: 33,
      attributes: {
        meta_title:
          'Daihatsu All New Xenia 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
        meta_description:
          'Beli mobil Daihatsu All New Xenia terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
        createdAt: '2022-05-19T06:31:44.361Z',
        updatedAt: '2022-09-21T09:55:25.264Z',
        publishedAt: '2022-05-19T06:31:45.924Z',
        location_page3: 'CarModelSELECTMASTERMODEL',
      },
    },
    {
      id: 49,
      attributes: {
        meta_title:
          'BMW X7 xDrive40i Opulence 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
        meta_description:
          'Beli mobil BMW X7 xDrive40i Opulence terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
        createdAt: '2022-05-19T06:53:15.377Z',
        updatedAt: '2022-09-21T10:00:50.917Z',
        publishedAt: '2022-05-19T06:53:17.010Z',
        location_page3: 'CarModelSELECTMASTERMODEL',
      },
    },
    {
      id: 30,
      attributes: {
        meta_title:
          'Daihatsu Rocky 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
        meta_description:
          'Beli mobil Daihatsu Rocky terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
        createdAt: '2022-05-19T03:27:29.761Z',
        updatedAt: '2022-09-21T09:54:47.406Z',
        publishedAt: '2022-05-19T03:27:30.475Z',
        location_page3: 'CarModelSELECTMASTERMODEL',
      },
    },
    {
      id: 32,
      attributes: {
        meta_title:
          'Daihatsu Sigra 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
        meta_description:
          'Beli mobil Daihatsu Sigra terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
        createdAt: '2022-05-19T06:31:04.554Z',
        updatedAt: '2022-09-21T09:55:13.395Z',
        publishedAt: '2022-05-19T06:31:05.615Z',
        location_page3: 'CarModelSELECTMASTERMODEL',
      },
    },
    {
      id: 28,
      attributes: {
        meta_title:
          'Toyota New Venturer 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
        meta_description:
          'Beli mobil Toyota New Venturer terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
        createdAt: '2022-05-19T03:26:09.012Z',
        updatedAt: '2022-09-21T09:54:14.810Z',
        publishedAt: '2022-05-19T03:26:09.709Z',
        location_page3: 'CarModelSELECTMASTERMODEL',
      },
    },
    {
      id: 22,
      attributes: {
        meta_title:
          'Toyota All New Veloz 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
        meta_description:
          'Beli mobil Toyota All New Veloz terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
        createdAt: '2022-05-19T03:22:40.495Z',
        updatedAt: '2022-09-21T09:52:53.812Z',
        publishedAt: '2022-05-19T03:22:41.209Z',
        location_page3: 'CarModelSELECTMASTERMODEL',
      },
    },
  ]

  const [head, setHead] = useState<any>({
    attributes: {
      meta_title:
        'Daihatsu Gran Max Pickup 2022 Harga OTR Cicilan Kredit & Spesifikasi | SEVA',
      meta_description:
        'Beli mobil Daihatsu Gran Max Pickup terbaru dengan dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA',
    },
  })
  const router = useRouter()

  useEffect(() => {
    // getDataMeta()
    const params = router.query.id
    const res = dataMetas.filter((item: any) => item.id == params)
    setHead(res[0])
  }, [])

  const getDataMeta = async () => {
    try {
      const res: any = await api.getMetaTitle()
      console.log('datas', res)
      setHead(res.data[0])
    } catch (error) {}
  }
  return (
    <>
      <Head>
        <title>{head.attributes.meta_title}</title>
        <meta name="title" content={head.attributes.meta_title} />
        <meta name="description" content={head.attributes.meta_description} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.wrapperHeader}>
          <Header
            dataMenu={dataMenu}
            onOpenModalOTR={() => setModalType('modalOTRSecondary')}
            onSearchClick={() => setModalType('modalSearch')}
          />
          <LocationList onClick={() => setModalType('modalLocationList')} />
        </div>
        <Floating onClickImage={() => setModalType('modalVideo')} />
        <div
          className={
            isAnnouncementBoxShow
              ? styles.wrapperPrimary
              : styles.wrapperSecondary
          }
        >
          <Banner data={dataBanner} />
          <CarList data={dataRecToyota} />
          <HowToUse data={dataUsage} />
          <LoanSection />
          <Recommendation data={dataRecMVP} categoryCar={dataTypeCar} />
          <Refinancing />
          <CarofTheMonth
            data={dataCarofTheMonth}
            openModalOffering={() => setModalType('modalOffering')}
          />
          <Testimony data={dataTestimony} />
          <Article data={dataMainArticle} />
        </div>
        <ContactUs
          openThankyouModal={() => setModalType('modalThankyou')}
          openLoginModal={() => setModalType('modalLogin')}
        />
        {renderModal(modalType)}
        <Footer />
      </main>
    </>
  )
}

export async function getServerSideProps({ res }: any) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  )

  try {
    const [
      bannerRes,
      menuRes,
      citiesRes,
      testimonyRes,
      recTotoyaRes,
      MVPRes,
      usageRes,
      mainArticleRes,
      typeCarRes,
      carofTheMonthRes,
      metaRes,
    ]: any = await Promise.all([
      api.getBanner(),
      api.getMenu(),
      api.getCities(),
      api.getTestimony(),
      api.getRecommendation('?brand=Toyota&city=jakarta&cityId=118'),
      api.getRecommendation('?bodyType=MPV&city=jakarta&cityId=118'),
      api.getUsage(),
      api.getMainArticle('65'),
      api.getTypeCar('?city=jakarta'),
      api.getCarofTheMonth(),
      api.getAnnouncementBox(),
      api.getMetaTitle(),
    ])
    const [
      dataBanner,
      dataMenu,
      dataCities,
      dataTestimony,
      dataRecToyota,
      dataRecMVP,
      dataUsage,
      dataMainArticle,
      dataTypeCar,
      dataCarofTheMonth,
      // dataMeta,
    ] = await Promise.all([
      bannerRes.data,
      menuRes.data,
      citiesRes,
      testimonyRes.data,
      recTotoyaRes.carRecommendations,
      MVPRes.carRecommendations,
      usageRes.data.attributes,
      mainArticleRes,
      typeCarRes,
      carofTheMonthRes.data,
      // metaRes.data,
    ])
    return {
      props: {
        dataBanner,
        dataMenu,
        dataCities,
        dataTestimony,
        dataRecToyota,
        dataRecMVP,
        dataUsage,
        dataMainArticle,
        dataTypeCar,
        dataCarofTheMonth,
        // dataMeta,
      },
    }
  } catch (error) {
    throw error
  }
}
