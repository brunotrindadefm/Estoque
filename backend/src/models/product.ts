import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';

// Product estende Model, tornando-se um modelo Sequelize que representa a tabela products no banco de dados.
class Product extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare stock: number; 
  declare image?: string | null;
}
// declare: Declara as propriedades da classe que o TypeScript deve considerar como parte da classe Product

Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: { // campo para armazenar a URL da imagem
      type: DataTypes.STRING(255)
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;
