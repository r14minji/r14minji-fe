import { util } from './../../store/modules/utils';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import useLocalstorage from '@rooks/use-localstorage';
import { useAppDispatch, useAppSelector } from '../../store/configureStore.hooks';
import { utilState, restoreScrollPos } from '../../store/modules/utils';
import { RootState } from '../../store/configureStore';

type PosItem = {
  pathName: string;
  pos: number;
};

function useScrollPos() {
  //useScroll 을 호출한 주소를 확인 후, state에 저장
  // Load 를 호출하면 주소에 저장된 position 확인 후 불러오고 setpos함

  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  const { beforePopState } = useRouter(); //pop 액션 직전에 이동하려는 url을 담고 호출된다.

  const isServer = typeof window === 'undefined'; //서버환경에서는 작동을 막는다.

  const restorePage = useAppSelector((state: RootState) => state.persistedReducer.util.restorePage); //ultil 스토어에 있는 RestorePage를 가지고 온다. 타입은

  const [posListFromStorage, setPosListToStorage] = useLocalstorage('posList', JSON.stringify([])); //로컬스토리지에 저장

  const posList: PosItem[] = useMemo(() => JSON.parse(posListFromStorage), [posListFromStorage]);

  const setPosList = (posLists: PosItem[]) => {
    setPosListToStorage(JSON.stringify(posLists));
  };

  const savePos = () => {
    if (isServer) return;

    let pageYOffset = window.pageYOffset;

    const pageIndex = posList.findIndex(({ pathName }) => pathName === pathname);
    // find로 현재 페이지와 posList내의 저장된 페이지가 일치하는 값을 찾는다.

    if (pageIndex === -1) {
      // find는 값을 못 찾으면 -1 반환
      const newPosLists = posList.concat({
        pathName: pathname,
        pos: pageYOffset,
      });
      setPosList(newPosLists);
      // 그러면 새로 저장해
    } else {
      //찾았으면

      const newPosLists = posList.map((item) => {
        const { pathName } = item;
        return pathName === pathname ? { ...item, pos: pageYOffset } : item;
      });
      setPosList(newPosLists);
      //기존꺼에 pos만 바꿔서 새로 저장해
    }
  };

  const restorePos = () => {
    if (isServer) return;

    beforePopState(({ url }) => {
      // pop action으로 이동하려는 url가져오기
      const urlWithoutParams = url.split('?')[0];
      // 쿼리스트링까지 나오므로 거르고 url만 추출
      dispatch(restoreScrollPos(urlWithoutParams));
      // restoreScrollPos 액션에다가 RestorePages 타입을 반환한다.
      return true;
      // true를 반환해줘야 정상적으로 url로 넘어간다.
    });
  };
  const loadPos = () => {
    if (isServer) return;

    if (restorePage !== pathname) return;
    // util store에 있는 restorePage가 목록에 없으면 종료 //확인 필요

    if (posList) {
      const position = posList.find(({ pathName }) => pathName === pathname)?.pos;
      //posList에서 현재 페이지랑 일치하는 아이템의 position가져옴

      if (position) {
        setTimeout(() => {
          window.scrollTo(0, position);
          return dispatch(restoreScrollPos(''));
        }, 0);
        // 이벤트루프에 넣으려고 setTimeout 사용
        // store에 있는 restoreScrollPosition을 비운다.(전용 액션 만들어서 할걸)
      }
    }
  };

  return { savePos, loadPos, restorePos };
  // 스크롤 위치의 저장, 불러오기, 저장된거 불러오는 요청.
}

export default useScrollPos;
