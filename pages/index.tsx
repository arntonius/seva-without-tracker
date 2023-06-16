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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

  const [head, setHead] = useState<any>({
    attributes: {
      meta_title: 'marcell',
      meta_description: 'antonius',
    },
  })

  useEffect(() => {
    getDataMeta()
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
      annoucementBoxRes,
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
      },
    }
  } catch (error) {
    throw error
  }
}
