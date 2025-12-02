/**
 * 中国省市区三级联动数据
 * 数据来源：国家统计局行政区划代码
 */
const CHINA_AREA_DATA = {
  provinces: [
    {
      code: '110000',
      name: '北京市',
      cities: [
        {
          code: '110100',
          name: '市辖区',
          districts: [
            { code: '110101', name: '东城区' },
            { code: '110102', name: '西城区' },
            { code: '110105', name: '朝阳区' },
            { code: '110106', name: '丰台区' },
            { code: '110107', name: '石景山区' },
            { code: '110108', name: '海淀区' },
            { code: '110109', name: '门头沟区' },
            { code: '110111', name: '房山区' },
            { code: '110112', name: '通州区' },
            { code: '110113', name: '顺义区' },
            { code: '110114', name: '昌平区' },
            { code: '110115', name: '大兴区' },
            { code: '110116', name: '怀柔区' },
            { code: '110117', name: '平谷区' },
            { code: '110118', name: '密云区' },
            { code: '110119', name: '延庆区' }
          ]
        }
      ]
    },
    {
      code: '120000',
      name: '天津市',
      cities: [
        {
          code: '120100',
          name: '市辖区',
          districts: [
            { code: '120101', name: '和平区' },
            { code: '120102', name: '河东区' },
            { code: '120103', name: '河西区' },
            { code: '120104', name: '南开区' },
            { code: '120105', name: '河北区' },
            { code: '120106', name: '红桥区' },
            { code: '120110', name: '东丽区' },
            { code: '120111', name: '西青区' },
            { code: '120112', name: '津南区' },
            { code: '120113', name: '北辰区' },
            { code: '120114', name: '武清区' },
            { code: '120115', name: '宝坻区' },
            { code: '120116', name: '滨海新区' },
            { code: '120117', name: '宁河区' },
            { code: '120118', name: '静海区' },
            { code: '120119', name: '蓟州区' }
          ]
        }
      ]
    },
    {
      code: '130000',
      name: '河北省',
      cities: [
        {
          code: '130100',
          name: '石家庄市',
          districts: [
            { code: '130102', name: '长安区' },
            { code: '130104', name: '桥西区' },
            { code: '130105', name: '新华区' },
            { code: '130107', name: '井陉矿区' },
            { code: '130108', name: '裕华区' },
            { code: '130109', name: '藁城区' },
            { code: '130110', name: '鹿泉区' },
            { code: '130111', name: '栾城区' }
          ]
        },
        {
          code: '130200',
          name: '唐山市',
          districts: [
            { code: '130202', name: '路南区' },
            { code: '130203', name: '路北区' },
            { code: '130204', name: '古冶区' },
            { code: '130205', name: '开平区' },
            { code: '130207', name: '丰南区' },
            { code: '130208', name: '丰润区' },
            { code: '130209', name: '曹妃甸区' }
          ]
        }
      ]
    },
    {
      code: '310000',
      name: '上海市',
      cities: [
        {
          code: '310100',
          name: '市辖区',
          districts: [
            { code: '310101', name: '黄浦区' },
            { code: '310104', name: '徐汇区' },
            { code: '310105', name: '长宁区' },
            { code: '310106', name: '静安区' },
            { code: '310107', name: '普陀区' },
            { code: '310109', name: '虹口区' },
            { code: '310110', name: '杨浦区' },
            { code: '310112', name: '闵行区' },
            { code: '310113', name: '宝山区' },
            { code: '310114', name: '嘉定区' },
            { code: '310115', name: '浦东新区' },
            { code: '310116', name: '金山区' },
            { code: '310117', name: '松江区' },
            { code: '310118', name: '青浦区' },
            { code: '310120', name: '奉贤区' },
            { code: '310151', name: '崇明区' }
          ]
        }
      ]
    },
    {
      code: '440000',
      name: '广东省',
      cities: [
        {
          code: '440100',
          name: '广州市',
          districts: [
            { code: '440103', name: '荔湾区' },
            { code: '440104', name: '越秀区' },
            { code: '440105', name: '海珠区' },
            { code: '440106', name: '天河区' },
            { code: '440111', name: '白云区' },
            { code: '440112', name: '黄埔区' },
            { code: '440113', name: '番禺区' },
            { code: '440114', name: '花都区' },
            { code: '440115', name: '南沙区' },
            { code: '440117', name: '从化区' },
            { code: '440118', name: '增城区' }
          ]
        },
        {
          code: '440300',
          name: '深圳市',
          districts: [
            { code: '440303', name: '罗湖区' },
            { code: '440304', name: '福田区' },
            { code: '440305', name: '南山区' },
            { code: '440306', name: '宝安区' },
            { code: '440307', name: '龙岗区' },
            { code: '440308', name: '盐田区' },
            { code: '440309', name: '龙华区' },
            { code: '440310', name: '坪山区' },
            { code: '440311', name: '光明区' }
          ]
        },
        {
          code: '440400',
          name: '珠海市',
          districts: [
            { code: '440402', name: '香洲区' },
            { code: '440403', name: '斗门区' },
            { code: '440404', name: '金湾区' }
          ]
        },
        {
          code: '440600',
          name: '佛山市',
          districts: [
            { code: '440604', name: '禅城区' },
            { code: '440605', name: '南海区' },
            { code: '440606', name: '顺德区' },
            { code: '440607', name: '三水区' },
            { code: '440608', name: '高明区' }
          ]
        },
        {
          code: '440700',
          name: '江门市',
          districts: [
            { code: '440703', name: '蓬江区' },
            { code: '440704', name: '江海区' },
            { code: '440705', name: '新会区' }
          ]
        },
        {
          code: '441900',
          name: '东莞市',
          districts: [
            { code: '441900003', name: '东城街道' },
            { code: '441900004', name: '南城街道' },
            { code: '441900005', name: '万江街道' },
            { code: '441900006', name: '莞城街道' },
            { code: '441900101', name: '石碣镇' },
            { code: '441900102', name: '石龙镇' },
            { code: '441900103', name: '茶山镇' },
            { code: '441900104', name: '石排镇' },
            { code: '441900105', name: '企石镇' },
            { code: '441900106', name: '横沥镇' },
            { code: '441900107', name: '桥头镇' },
            { code: '441900108', name: '谢岗镇' },
            { code: '441900109', name: '东坑镇' },
            { code: '441900110', name: '常平镇' },
            { code: '441900111', name: '寮步镇' },
            { code: '441900112', name: '樟木头镇' },
            { code: '441900113', name: '大朗镇' },
            { code: '441900114', name: '黄江镇' },
            { code: '441900115', name: '清溪镇' },
            { code: '441900116', name: '塘厦镇' },
            { code: '441900117', name: '凤岗镇' },
            { code: '441900118', name: '大岭山镇' },
            { code: '441900119', name: '长安镇' },
            { code: '441900121', name: '虎门镇' },
            { code: '441900122', name: '厚街镇' },
            { code: '441900123', name: '沙田镇' },
            { code: '441900124', name: '道滘镇' },
            { code: '441900125', name: '洪梅镇' },
            { code: '441900126', name: '麻涌镇' },
            { code: '441900127', name: '望牛墩镇' },
            { code: '441900128', name: '中堂镇' },
            { code: '441900129', name: '高埗镇' }
          ]
        }
      ]
    },
    {
      code: '330000',
      name: '浙江省',
      cities: [
        {
          code: '330100',
          name: '杭州市',
          districts: [
            { code: '330102', name: '上城区' },
            { code: '330103', name: '下城区' },
            { code: '330104', name: '江干区' },
            { code: '330105', name: '拱墅区' },
            { code: '330106', name: '西湖区' },
            { code: '330108', name: '滨江区' },
            { code: '330109', name: '萧山区' },
            { code: '330110', name: '余杭区' },
            { code: '330111', name: '富阳区' },
            { code: '330112', name: '临安区' }
          ]
        },
        {
          code: '330200',
          name: '宁波市',
          districts: [
            { code: '330203', name: '海曙区' },
            { code: '330205', name: '江北区' },
            { code: '330206', name: '北仑区' },
            { code: '330211', name: '镇海区' },
            { code: '330212', name: '鄞州区' },
            { code: '330213', name: '奉化区' }
          ]
        }
      ]
    },
    {
      code: '320000',
      name: '江苏省',
      cities: [
        {
          code: '320100',
          name: '南京市',
          districts: [
            { code: '320102', name: '玄武区' },
            { code: '320104', name: '秦淮区' },
            { code: '320105', name: '建邺区' },
            { code: '320106', name: '鼓楼区' },
            { code: '320111', name: '浦口区' },
            { code: '320113', name: '栖霞区' },
            { code: '320114', name: '雨花台区' },
            { code: '320115', name: '江宁区' },
            { code: '320116', name: '六合区' },
            { code: '320117', name: '溧水区' },
            { code: '320118', name: '高淳区' }
          ]
        },
        {
          code: '320500',
          name: '苏州市',
          districts: [
            { code: '320505', name: '虎丘区' },
            { code: '320506', name: '吴中区' },
            { code: '320507', name: '相城区' },
            { code: '320508', name: '姑苏区' },
            { code: '320509', name: '吴江区' }
          ]
        }
      ]
    },
    {
      code: '500000',
      name: '重庆市',
      cities: [
        {
          code: '500100',
          name: '市辖区',
          districts: [
            { code: '500101', name: '万州区' },
            { code: '500102', name: '涪陵区' },
            { code: '500103', name: '渝中区' },
            { code: '500104', name: '大渡口区' },
            { code: '500105', name: '江北区' },
            { code: '500106', name: '沙坪坝区' },
            { code: '500107', name: '九龙坡区' },
            { code: '500108', name: '南岸区' },
            { code: '500109', name: '北碚区' },
            { code: '500110', name: '綦江区' },
            { code: '500111', name: '大足区' },
            { code: '500112', name: '渝北区' },
            { code: '500113', name: '巴南区' },
            { code: '500114', name: '黔江区' },
            { code: '500115', name: '长寿区' },
            { code: '500116', name: '江津区' },
            { code: '500117', name: '合川区' },
            { code: '500118', name: '永川区' },
            { code: '500119', name: '南川区' },
            { code: '500120', name: '璧山区' },
            { code: '500151', name: '铜梁区' },
            { code: '500152', name: '潼南区' },
            { code: '500153', name: '荣昌区' },
            { code: '500154', name: '开州区' }
          ]
        }
      ]
    },
    {
      code: '510000',
      name: '四川省',
      cities: [
        {
          code: '510100',
          name: '成都市',
          districts: [
            { code: '510104', name: '锦江区' },
            { code: '510105', name: '青羊区' },
            { code: '510106', name: '金牛区' },
            { code: '510107', name: '武侯区' },
            { code: '510108', name: '成华区' },
            { code: '510112', name: '龙泉驿区' },
            { code: '510113', name: '青白江区' },
            { code: '510114', name: '新都区' },
            { code: '510115', name: '温江区' },
            { code: '510116', name: '双流区' },
            { code: '510117', name: '郫都区' },
            { code: '510118', name: '新津区' }
          ]
        }
      ]
    },
    {
      code: '420000',
      name: '湖北省',
      cities: [
        {
          code: '420100',
          name: '武汉市',
          districts: [
            { code: '420102', name: '江岸区' },
            { code: '420103', name: '江汉区' },
            { code: '420104', name: '硚口区' },
            { code: '420105', name: '汉阳区' },
            { code: '420106', name: '武昌区' },
            { code: '420107', name: '青山区' },
            { code: '420111', name: '洪山区' },
            { code: '420112', name: '东西湖区' },
            { code: '420113', name: '汉南区' },
            { code: '420114', name: '蔡甸区' },
            { code: '420115', name: '江夏区' },
            { code: '420116', name: '黄陂区' },
            { code: '420117', name: '新洲区' }
          ]
        }
      ]
    },
    {
      code: '410000',
      name: '河南省',
      cities: [
        {
          code: '410100',
          name: '郑州市',
          districts: [
            { code: '410102', name: '中原区' },
            { code: '410103', name: '二七区' },
            { code: '410104', name: '管城回族区' },
            { code: '410105', name: '金水区' },
            { code: '410106', name: '上街区' },
            { code: '410108', name: '惠济区' },
            { code: '410122', name: '中牟县' },
            { code: '410181', name: '巩义市' },
            { code: '410182', name: '荥阳市' },
            { code: '410183', name: '新密市' },
            { code: '410184', name: '新郑市' },
            { code: '410185', name: '登封市' }
          ]
        }
      ]
    },
    {
      code: '430000',
      name: '湖南省',
      cities: [
        {
          code: '430100',
          name: '长沙市',
          districts: [
            { code: '430102', name: '芙蓉区' },
            { code: '430103', name: '天心区' },
            { code: '430104', name: '岳麓区' },
            { code: '430105', name: '开福区' },
            { code: '430111', name: '雨花区' },
            { code: '430112', name: '望城区' },
            { code: '430121', name: '长沙县' },
            { code: '430181', name: '浏阳市' },
            { code: '430182', name: '宁乡市' }
          ]
        }
      ]
    },
    {
      code: '370000',
      name: '山东省',
      cities: [
        {
          code: '370100',
          name: '济南市',
          districts: [
            { code: '370102', name: '历下区' },
            { code: '370103', name: '市中区' },
            { code: '370104', name: '槐荫区' },
            { code: '370105', name: '天桥区' },
            { code: '370112', name: '历城区' },
            { code: '370113', name: '长清区' },
            { code: '370114', name: '章丘区' },
            { code: '370115', name: '济阳区' },
            { code: '370116', name: '莱芜区' },
            { code: '370117', name: '钢城区' }
          ]
        },
        {
          code: '370200',
          name: '青岛市',
          districts: [
            { code: '370202', name: '市南区' },
            { code: '370203', name: '市北区' },
            { code: '370211', name: '黄岛区' },
            { code: '370212', name: '崂山区' },
            { code: '370213', name: '李沧区' },
            { code: '370214', name: '城阳区' },
            { code: '370215', name: '即墨区' }
          ]
        }
      ]
    },
    {
      code: '610000',
      name: '陕西省',
      cities: [
        {
          code: '610100',
          name: '西安市',
          districts: [
            { code: '610102', name: '新城区' },
            { code: '610103', name: '碑林区' },
            { code: '610104', name: '莲湖区' },
            { code: '610111', name: '灞桥区' },
            { code: '610112', name: '未央区' },
            { code: '610113', name: '雁塔区' },
            { code: '610114', name: '阎良区' },
            { code: '610115', name: '临潼区' },
            { code: '610116', name: '长安区' },
            { code: '610117', name: '高陵区' },
            { code: '610118', name: '鄠邑区' }
          ]
        }
      ]
    },
    {
      code: '340000',
      name: '安徽省',
      cities: [
        {
          code: '340100',
          name: '合肥市',
          districts: [
            { code: '340102', name: '瑶海区' },
            { code: '340103', name: '庐阳区' },
            { code: '340104', name: '蜀山区' },
            { code: '340111', name: '包河区' },
            { code: '340121', name: '长丰县' },
            { code: '340122', name: '肥东县' },
            { code: '340123', name: '肥西县' },
            { code: '340124', name: '庐江县' },
            { code: '340181', name: '巢湖市' }
          ]
        }
      ]
    },
    {
      code: '350000',
      name: '福建省',
      cities: [
        {
          code: '350100',
          name: '福州市',
          districts: [
            { code: '350102', name: '鼓楼区' },
            { code: '350103', name: '台江区' },
            { code: '350104', name: '仓山区' },
            { code: '350105', name: '马尾区' },
            { code: '350111', name: '晋安区' },
            { code: '350112', name: '长乐区' }
          ]
        },
        {
          code: '350200',
          name: '厦门市',
          districts: [
            { code: '350203', name: '思明区' },
            { code: '350205', name: '海沧区' },
            { code: '350206', name: '湖里区' },
            { code: '350211', name: '集美区' },
            { code: '350212', name: '同安区' },
            { code: '350213', name: '翔安区' }
          ]
        }
      ]
    },
    {
      code: '360000',
      name: '江西省',
      cities: [
        {
          code: '360100',
          name: '南昌市',
          districts: [
            { code: '360102', name: '东湖区' },
            { code: '360103', name: '西湖区' },
            { code: '360104', name: '青云谱区' },
            { code: '360111', name: '青山湖区' },
            { code: '360112', name: '新建区' },
            { code: '360113', name: '红谷滩区' }
          ]
        }
      ]
    },
    {
      code: '530000',
      name: '云南省',
      cities: [
        {
          code: '530100',
          name: '昆明市',
          districts: [
            { code: '530102', name: '五华区' },
            { code: '530103', name: '盘龙区' },
            { code: '530111', name: '官渡区' },
            { code: '530112', name: '西山区' },
            { code: '530113', name: '东川区' },
            { code: '530114', name: '呈贡区' }
          ]
        }
      ]
    },
    {
      code: '520000',
      name: '贵州省',
      cities: [
        {
          code: '520100',
          name: '贵阳市',
          districts: [
            { code: '520102', name: '南明区' },
            { code: '520103', name: '云岩区' },
            { code: '520111', name: '花溪区' },
            { code: '520112', name: '乌当区' },
            { code: '520113', name: '白云区' },
            { code: '520115', name: '观山湖区' }
          ]
        }
      ]
    },
    {
      code: '450000',
      name: '广西壮族自治区',
      cities: [
        {
          code: '450100',
          name: '南宁市',
          districts: [
            { code: '450102', name: '兴宁区' },
            { code: '450103', name: '青秀区' },
            { code: '450105', name: '江南区' },
            { code: '450107', name: '西乡塘区' },
            { code: '450108', name: '良庆区' },
            { code: '450109', name: '邕宁区' },
            { code: '450110', name: '武鸣区' }
          ]
        }
      ]
    },
    {
      code: '460000',
      name: '海南省',
      cities: [
        {
          code: '460100',
          name: '海口市',
          districts: [
            { code: '460105', name: '秀英区' },
            { code: '460106', name: '龙华区' },
            { code: '460107', name: '琼山区' },
            { code: '460108', name: '美兰区' }
          ]
        },
        {
          code: '460200',
          name: '三亚市',
          districts: [
            { code: '460202', name: '海棠区' },
            { code: '460203', name: '吉阳区' },
            { code: '460204', name: '天涯区' },
            { code: '460205', name: '崖州区' }
          ]
        }
      ]
    },
    {
      code: '140000',
      name: '山西省',
      cities: [
        {
          code: '140100',
          name: '太原市',
          districts: [
            { code: '140105', name: '小店区' },
            { code: '140106', name: '迎泽区' },
            { code: '140107', name: '杏花岭区' },
            { code: '140108', name: '尖草坪区' },
            { code: '140109', name: '万柏林区' },
            { code: '140110', name: '晋源区' }
          ]
        }
      ]
    },
    {
      code: '210000',
      name: '辽宁省',
      cities: [
        {
          code: '210100',
          name: '沈阳市',
          districts: [
            { code: '210102', name: '和平区' },
            { code: '210103', name: '沈河区' },
            { code: '210104', name: '大东区' },
            { code: '210105', name: '皇姑区' },
            { code: '210106', name: '铁西区' },
            { code: '210111', name: '苏家屯区' },
            { code: '210112', name: '浑南区' },
            { code: '210113', name: '沈北新区' },
            { code: '210114', name: '于洪区' }
          ]
        },
        {
          code: '210200',
          name: '大连市',
          districts: [
            { code: '210202', name: '中山区' },
            { code: '210203', name: '西岗区' },
            { code: '210204', name: '沙河口区' },
            { code: '210211', name: '甘井子区' },
            { code: '210212', name: '旅顺口区' },
            { code: '210213', name: '金州区' },
            { code: '210214', name: '普兰店区' }
          ]
        }
      ]
    },
    {
      code: '220000',
      name: '吉林省',
      cities: [
        {
          code: '220100',
          name: '长春市',
          districts: [
            { code: '220102', name: '南关区' },
            { code: '220103', name: '宽城区' },
            { code: '220104', name: '朝阳区' },
            { code: '220105', name: '二道区' },
            { code: '220106', name: '绿园区' },
            { code: '220112', name: '双阳区' },
            { code: '220113', name: '九台区' }
          ]
        }
      ]
    },
    {
      code: '230000',
      name: '黑龙江省',
      cities: [
        {
          code: '230100',
          name: '哈尔滨市',
          districts: [
            { code: '230102', name: '道里区' },
            { code: '230103', name: '南岗区' },
            { code: '230104', name: '道外区' },
            { code: '230108', name: '平房区' },
            { code: '230109', name: '松北区' },
            { code: '230110', name: '香坊区' },
            { code: '230111', name: '呼兰区' },
            { code: '230112', name: '阿城区' },
            { code: '230113', name: '双城区' }
          ]
        }
      ]
    },
    {
      code: '150000',
      name: '内蒙古自治区',
      cities: [
        {
          code: '150100',
          name: '呼和浩特市',
          districts: [
            { code: '150102', name: '新城区' },
            { code: '150103', name: '回民区' },
            { code: '150104', name: '玉泉区' },
            { code: '150105', name: '赛罕区' }
          ]
        }
      ]
    },
    {
      code: '620000',
      name: '甘肃省',
      cities: [
        {
          code: '620100',
          name: '兰州市',
          districts: [
            { code: '620102', name: '城关区' },
            { code: '620103', name: '七里河区' },
            { code: '620104', name: '西固区' },
            { code: '620105', name: '安宁区' },
            { code: '620111', name: '红古区' }
          ]
        }
      ]
    },
    {
      code: '630000',
      name: '青海省',
      cities: [
        {
          code: '630100',
          name: '西宁市',
          districts: [
            { code: '630102', name: '城东区' },
            { code: '630103', name: '城中区' },
            { code: '630104', name: '城西区' },
            { code: '630105', name: '城北区' },
            { code: '630121', name: '大通回族土族自治县' },
            { code: '630122', name: '湟中县' },
            { code: '630123', name: '湟源县' }
          ]
        }
      ]
    },
    {
      code: '640000',
      name: '宁夏回族自治区',
      cities: [
        {
          code: '640100',
          name: '银川市',
          districts: [
            { code: '640104', name: '兴庆区' },
            { code: '640105', name: '西夏区' },
            { code: '640106', name: '金凤区' },
            { code: '640121', name: '永宁县' },
            { code: '640122', name: '贺兰县' },
            { code: '640181', name: '灵武市' }
          ]
        }
      ]
    },
    {
      code: '650000',
      name: '新疆维吾尔自治区',
      cities: [
        {
          code: '650100',
          name: '乌鲁木齐市',
          districts: [
            { code: '650102', name: '天山区' },
            { code: '650103', name: '沙依巴克区' },
            { code: '650104', name: '新市区' },
            { code: '650105', name: '水磨沟区' },
            { code: '650106', name: '头屯河区' },
            { code: '650107', name: '达坂城区' },
            { code: '650109', name: '米东区' }
          ]
        }
      ]
    },
    {
      code: '540000',
      name: '西藏自治区',
      cities: [
        {
          code: '540100',
          name: '拉萨市',
          districts: [
            { code: '540102', name: '城关区' },
            { code: '540103', name: '堆龙德庆区' },
            { code: '540104', name: '达孜区' },
            { code: '540121', name: '林周县' },
            { code: '540122', name: '当雄县' },
            { code: '540123', name: '尼木县' },
            { code: '540124', name: '曲水县' },
            { code: '540127', name: '墨竹工卡县' }
          ]
        }
      ]
    },
    {
      code: '710000',
      name: '台湾省',
      cities: [
        {
          code: '710100',
          name: '台北市',
          districts: [
            { code: '710101', name: '中正区' },
            { code: '710102', name: '大同区' },
            { code: '710103', name: '中山区' },
            { code: '710104', name: '松山区' },
            { code: '710105', name: '大安区' },
            { code: '710106', name: '万华区' },
            { code: '710107', name: '信义区' },
            { code: '710108', name: '士林区' },
            { code: '710109', name: '北投区' },
            { code: '710110', name: '内湖区' },
            { code: '710111', name: '南港区' },
            { code: '710112', name: '文山区' }
          ]
        }
      ]
    },
    {
      code: '810000',
      name: '香港特别行政区',
      cities: [
        {
          code: '810100',
          name: '香港岛',
          districts: [
            { code: '810101', name: '中西区' },
            { code: '810102', name: '湾仔区' },
            { code: '810103', name: '东区' },
            { code: '810104', name: '南区' }
          ]
        },
        {
          code: '810200',
          name: '九龙',
          districts: [
            { code: '810201', name: '油尖旺区' },
            { code: '810202', name: '深水埗区' },
            { code: '810203', name: '九龙城区' },
            { code: '810204', name: '黄大仙区' },
            { code: '810205', name: '观塘区' }
          ]
        },
        {
          code: '810300',
          name: '新界',
          districts: [
            { code: '810301', name: '北区' },
            { code: '810302', name: '大埔区' },
            { code: '810303', name: '沙田区' },
            { code: '810304', name: '西贡区' },
            { code: '810305', name: '元朗区' },
            { code: '810306', name: '屯门区' },
            { code: '810307', name: '荃湾区' },
            { code: '810308', name: '葵青区' },
            { code: '810309', name: '离岛区' }
          ]
        }
      ]
    },
    {
      code: '820000',
      name: '澳门特别行政区',
      cities: [
        {
          code: '820100',
          name: '澳门半岛',
          districts: [
            { code: '820101', name: '花地玛堂区' },
            { code: '820102', name: '花王堂区' },
            { code: '820103', name: '望德堂区' },
            { code: '820104', name: '大堂区' },
            { code: '820105', name: '风顺堂区' }
          ]
        },
        {
          code: '820200',
          name: '离岛',
          districts: [
            { code: '820201', name: '嘉模堂区' },
            { code: '820202', name: '圣方济各堂区' }
          ]
        }
      ]
    }
  ]
};
