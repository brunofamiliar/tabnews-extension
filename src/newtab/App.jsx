import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { pt } from 'date-fns/locale';

import { CgTab } from "react-icons/cg";
import { TbFlame  } from "react-icons/tb";
import { RiNewspaperLine } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

import TabCoin from '../../static/icons/tabcoin.svg'
import Gold from '../../static/icons/gold.svg'
import Silver from '../../static/icons/silver.svg'
import Bronze from '../../static/icons/bronze.svg'

import "./App.css"

export default function App(){

    const [tabActive, setTabActive] = useState(1);
    const [news, setNews] = useState([]);

    useEffect(() => {
        let urlToGet = tabActive === 1 ? 'https://www.tabnews.com.br/api/v1/contents' : 'https://www.tabnews.com.br/api/v1/contents?strategy=new'

        fetch(urlToGet)
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw response
        })
        .then(response => {
            setNews(response)
        })
        .catch(error => console.log(error))
    }, [tabActive])

    const formatPublishedSince = (date) => {
        const publishedSince = formatDistanceToNowStrict(new Date(date), {
          addSuffix: false,
          includeSeconds: true,
          locale: pt,
        });
    
        return `${publishedSince} atrás`;
      }
    
    return(
        <div>
            <div className="wrapper-header">
                <header className="container-tbw flex justify-between items-center h-full text-white">
                    <nav className='text-base flex'>
                        <a className={`flex items-center mr-8 px-6 py-2 cursor-pointer ${ tabActive === 1 ? 'active' : '' }`} onClick={() => { setTabActive(1) }}>
                            <TbFlame className="w-6 h-6 mr-3 text-white"/>
                            <span>Relevantes</span>
                        </a>
                        <a className={`flex items-center mr-8 px-6 py-2 cursor-pointer ${ tabActive === 2 ? 'active' : '' }`} onClick={() => { setTabActive(2) }}>
                            <RiNewspaperLine className="w-5 h-5 mr-3 text-white"/>
                            <span>Recentes</span>
                        </a>
                    </nav>
                    <a href="https://tabnews.com.br/" className="flex items-center justify-center grow cursor-pointer">
                        <CgTab className="w-7 h-8 mr-3 text-white" />
                        <span className="text-xl font-medium text-white">TabNews</span>
                    </a>
                    <div style={{ width: 286 }}></div>
                </header>
            </div>
            <main className='mt-10'>
                <h2 className='container-tbw text-2xl font-semibold title'>{ tabActive == 1 ? 'Relevantes' : 'Recentes' }</h2>
                <ul className='container-tbw'>
                    {news.map((newData, index) => (
                        <li className='my-8 flex flex-col  item-list'>
                            <div className='flex items-center'>
                            <div className={`${ (index === 0 && tabActive === 1) ? 'gold mr-8 flex items-center justify-center' : (index === 1 && tabActive === 1) ? 'silver mr-8 flex items-center justify-center' : (index === 2 && tabActive === 1) ? 'bronze mr-8 flex items-center justify-center' : 'default mr-8 flex items-center justify-center'}`}>
                                {(index === 0 && tabActive === 1) && <Gold/>}
                                {(index === 1 && tabActive === 1) && <Silver/>}
                                {(index === 2  && tabActive === 1) && <Bronze/>}
                                {(index > 2 || tabActive === 2) ? <span className='font-semibold text-lg text-white'>{ index + 1 }</span> : ""}      
                            </div>
                            <div>
                            <span className='date py-1 px-4'>{formatPublishedSince(newData.published_at)}</span>
                            <h3 className='font-semibold text-xl  mt-3'>{newData.title}</h3>
                            <p className='action-bar mt-3'>
                                <ul className='flex'>
                                    <li className='mr-4 flex items-center'>
                                        <TabCoin className="mr-2"/>
                                        {newData.tabcoins}
                                    </li>
                                    <li className='mr-4 flex items-center'>
                                        <FaRegCommentDots className="mr-2" style={{width: 16, height: 14, color: "#24292F"}}/>
                                        {newData.children_deep_count}
                                    </li>
                                    <li className='mr-4 flex items-center'>
                                        <BiUser className="mr-2" style={{width: 16, height: 16, color: "#24292F"}}/>
                                        {newData.owner_username}
                                    </li>
                                </ul>
                            </p>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}