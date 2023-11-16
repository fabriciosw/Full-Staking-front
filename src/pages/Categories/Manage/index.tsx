import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { MdAddBox } from 'react-icons/md';
import { IoMdCalendar } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';
import { Box, Button, Modal } from '@mui/material';
import Aside from '../../../components/Aside';
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import formatDate from '../../../utils/formatDate';
import { useLoader } from '../../../contexts/LoaderContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import PostCategoriesService from '../../../services/postCategories.service';
import IPostCategory from '../../../interfaces/IPostCategory';
import styles from './styles.module.scss';
import Input from '../../../components/Input';

const ManageCategories: React.FunctionComponent = () => {
  const [postCategories, setPostCategories] = useState<IPostCategory[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const { renderLoader } = useLoader();

  const fetchCategories = async (): Promise<void> => {
    try {
      const categories = await PostCategoriesService.readAll();

      setPostCategories(categories);
    } catch (error) {
      toastMsg(ToastType.Error, 'Ocorreu algum problema ao carregar as categorias');
    }
  };

  useEffect(() => {
    renderLoader('show');
    fetchCategories().finally(() => renderLoader('hide'));
  }, []);

  const createCategory = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    renderLoader('show');

    PostCategoriesService.create(name)
      .then(async () => {
        toastMsg(ToastType.Success, 'Categoria criada!');
        await fetchCategories();
        setShowCreateModal(false);
        setName('');
      })
      .catch((error) => {
        if (error?.response?.data?.message === 'CATEGORY_NAME_ALREADY_REGISTERED')
          toastMsg(ToastType.Error, 'Já existe uma categoria com esse nome');
        else toastMsg(ToastType.Error, 'Ocorreu algum problema ao criar a categoria');
      })
      .finally(() => {
        renderLoader('hide');
      });
  };

  return (
    <Section className="p-0 d-flex" title="Categorias">
      <Col md={12} className={styles.container}>
        <Aside />

        <Modal open={showCreateModal}>
          <Box className={styles.modal}>
            <Button onClick={() => setShowCreateModal(false)} className={styles.modal__close}>
              <CgClose size={40} color="#4B5EFB" />
            </Button>
            <div className="d-flex flex-row justify-content-between">
              <Text as="h2" size="2.5rem" weight={700} color="#E0E5E9" className="mb-0">
                Criar categoria
              </Text>
            </div>
            <form onSubmit={(event) => createCategory(event)}>
              <Text as="h3" size="1.25rem" weight={400} color="#E0E5E9" className="mb-0 mt-5 mx-2">
                Nome da categoria
              </Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginTop: 1, marginBottom: 4 }}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" fullWidth className={styles.modal__submit}>
                Criar
              </Button>
            </form>
          </Box>
        </Modal>

        <div className={styles.container__body}>
          <div className={styles.categories}>
            <div className="d-flex flex-row justify-content-between">
              <Text as="h1" size="3.5rem" weight={700} color="#E0E5E9" className="mb-2">
                Categorias
              </Text>
              <Button onClick={() => setShowCreateModal(true)} className="mx-4 mt-1 p-0">
                <MdAddBox size={55} color="#4B5EFB" className="p-0" />
              </Button>
            </div>

            <div className={styles.categories__cards}>
              {React.Children.toArray(
                postCategories.map((postCategory) => (
                  <div className={styles.categories__card}>
                    <Text as="h3" size="1.5rem" weight={600} color="#E0E5E9" className="mb-2">
                      {postCategory.name}
                    </Text>
                    <div className="d-flex flex-row align-items-center mt-2">
                      <IoMdCalendar size={25} color="#888d93" className="mx-2" />
                      <Text as="h3" size="1.065rem" weight={500} color="#888d93" className="mb-0">
                        Criada em: {formatDate(postCategory.createdAt)}
                      </Text>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Col>
    </Section>
  );
};

export default ManageCategories;
